import { Command } from '@colyseus/command'
import { PayloadInterface } from '../interfaces/Payload'
import { OfficeStateInterface } from '../interfaces/OfficeState'

export class WhiteboardAddUserCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, whiteboardId } = data
    const whiteboard = this.room.state.whiteboards.get(whiteboardId)
    const clientId = client.sessionId

    if (!whiteboard || whiteboard.connectedUser.has(clientId)) return
    whiteboard.connectedUser.add(clientId)
  }
}

export class WhiteboardRemoveUserCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, whiteboardId } = data
    const whiteboard = this.state.whiteboards.get(whiteboardId)

    if (whiteboard.connectedUser.has(client.sessionId)) {
      whiteboard.connectedUser.delete(client.sessionId)
    }
  }
}
