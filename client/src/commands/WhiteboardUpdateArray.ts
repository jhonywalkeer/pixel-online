import { Command } from '@colyseus/command'
import { Payload } from '../interfaces/Payload'
import { OfficeState } from '../interfaces/OfficeState'

export class WhiteboardAddUserCommand extends Command<OfficeState, Payload> {
  execute(data: Payload) {
    const { client, whiteboardId } = data
    const whiteboard = this.room.state.whiteboards.get(whiteboardId)
    const clientId = client.sessionId

    if (!whiteboard || whiteboard.connectedUser.has(clientId)) return
    whiteboard.connectedUser.add(clientId)
  }
}

export class WhiteboardRemoveUserCommand extends Command<OfficeState, Payload> {
  execute(data: Payload) {
    const { client, whiteboardId } = data
    const whiteboard = this.state.whiteboards.get(whiteboardId)

    if (whiteboard.connectedUser.has(client.sessionId)) {
      whiteboard.connectedUser.delete(client.sessionId)
    }
  }
}
