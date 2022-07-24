import bcrypt from 'bcrypt'
import { Room, Client, ServerError } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { PlayerEntity } from '../entities/schema/Player'
import { OfficeStateEntity } from '../entities/schema/OfficeState'
import { ComputerEntity } from '../entities/schema/Computer'
import { WhiteboardEntity } from '../entities/schema/Whiteboard'
import { whiteboardRoomIds } from '../entities/schema/OfficeState'
import { MessageEnum } from '../utils/enums/Messages'
import { RoomInterface } from '../interfaces/Room'
import PlayerUpdateCommand from '../commands/PlayerUpdate'
import PlayerEditCommand from '../commands/PlayerEdit'
import { ComputerAddUserCommand, ComputerRemoveUserCommand } from '../commands/ComputerUpdateArray'
import {
  WhiteboardAddUserCommand,
  WhiteboardRemoveUserCommand,
} from '../commands/WhiteboardUpdateArray'
import ChatMessageUpdateCommand from '../commands/ChatMessageUpdate'
import { PayloadInterface } from '../interfaces/Payload'
import logger from '../utils/functions/logger.js'

export class Pixel extends Room<OfficeStateEntity> {
  private dispatcher = new Dispatcher(this)
  private name: string
  private description: string
  private password: string | null = null

  async onCreate(options: RoomInterface) {
    const { name, description, password, autoDispose } = options
    this.name = name
    this.description = description
    this.autoDispose = autoDispose

    let hasPassword = false

    if (password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(password, salt)
      hasPassword = true
    }

    this.setMetadata({ name, description, hasPassword })
    this.setState(new OfficeStateEntity())

    for (let i = 0; i < 5; i++) {
      this.state.computers.set(String(i), new ComputerEntity())
    }

    for (let i = 0; i < 3; i++) {
      this.state.whiteboards.set(String(i), new WhiteboardEntity())
    }

    this.onMessage(MessageEnum.CONNECT_TO_COMPUTER, (client, message: { computerId: string }) => {
      this.dispatcher.dispatch(new ComputerAddUserCommand(), {
        client,
        computerId: message.computerId,
      })
    })

    this.onMessage(
      MessageEnum.DISCONNECT_FROM_COMPUTER,
      (client, message: { computerId: string }) => {
        this.dispatcher.dispatch(new ComputerRemoveUserCommand(), {
          client,
          computerId: message.computerId,
        })
      }
    )

    this.onMessage(MessageEnum.STOP_SCREEN_SHARE, (client, message: { computerId: string }) => {
      const computer = this.state.computers.get(message.computerId)
      computer.connectedUser.forEach((id) => {
        this.clients.forEach((cli) => {
          if (cli.sessionId === id && cli.sessionId !== client.sessionId) {
            cli.send(MessageEnum.STOP_SCREEN_SHARE, client.sessionId)
          }
        })
      })
    })

    this.onMessage(
      MessageEnum.CONNECT_TO_WHITEBOARD,
      (client, message: { whiteboardId: string }) => {
        this.dispatcher.dispatch(new WhiteboardAddUserCommand(), {
          client,
          whiteboardId: message.whiteboardId,
        })
      }
    )

    this.onMessage(
      MessageEnum.DISCONNECT_FROM_WHITEBOARD,
      (client, message: { whiteboardId: string }) => {
        this.dispatcher.dispatch(new WhiteboardRemoveUserCommand(), {
          client,
          whiteboardId: message.whiteboardId,
        })
      }
    )

    this.onMessage(
      MessageEnum.UPDATE_PLAYER,
      (client, message: { x: number; y: number; anim: string }) => {
        this.dispatcher.dispatch(new PlayerUpdateCommand(), {
          client,
          x: message.x,
          y: message.y,
          anim: message.anim,
        })
      }
    )

    this.onMessage(MessageEnum.UPDATE_PLAYER_NAME, (client, message: { name: string }) => {
      this.dispatcher.dispatch(new PlayerEditCommand(), {
        client,
        name: message.name,
      })
    })

    this.onMessage(MessageEnum.READY_TO_CONNECT, (client) => {
      const player = this.state.players.get(client.sessionId)
      if (player) player.readyToConnect = true
    })

    this.onMessage(MessageEnum.VIDEO_CONNECTED, (client) => {
      const player = this.state.players.get(client.sessionId)
      if (player) player.videoConnected = true
    })

    this.onMessage(MessageEnum.DISCONNECT_STREAM, (client, message: { clientId: string }) => {
      this.clients.forEach((cli) => {
        if (cli.sessionId === message.clientId) {
          cli.send(MessageEnum.DISCONNECT_STREAM, client.sessionId)
        }
      })
    })

    this.onMessage(MessageEnum.ADD_CHAT_MESSAGE, (client, message: { content: string }) => {
      this.dispatcher.dispatch(new ChatMessageUpdateCommand(), {
        client,
        content: message.content,
      })
      this.broadcast(
        MessageEnum.ADD_CHAT_MESSAGE,
        { clientId: client.sessionId, content: message.content },
        { except: client }
      )
    })
  }
  async onAuth(client: Client, options: { password: string | null }) {
    if (this.password) {
      const validPassword = await bcrypt.compare(options.password, this.password)
      if (!validPassword) {
        throw new ServerError(403, 'Password is incorrect!')
      }
    }
    return true
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new PlayerEntity())
    client.send(MessageEnum.SEND_ROOM_DATA, {
      id: this.roomId,
      name: this.name,
      description: this.description,
    })
  }

  onLeave(client: Client, consented: boolean) {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId)
    }
    this.state.computers.forEach((computer) => {
      if (computer.connectedUser.has(client.sessionId)) {
        computer.connectedUser.delete(client.sessionId)
      }
    })
    this.state.whiteboards.forEach((whiteboard) => {
      if (whiteboard.connectedUser.has(client.sessionId)) {
        whiteboard.connectedUser.delete(client.sessionId)
      }
    })
  }

  onDispose() {
    this.state.whiteboards.forEach((whiteboard) => {
      if (whiteboardRoomIds.has(whiteboard.roomId)) whiteboardRoomIds.delete(whiteboard.roomId)
    })

    logger.info('room', this.roomId, 'disposing...')
    this.dispatcher.stop()
  }
}
