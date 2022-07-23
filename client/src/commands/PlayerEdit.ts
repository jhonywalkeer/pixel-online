import { Command } from '@colyseus/command'
import { Payload } from '../interfaces/Payload'
import { OfficeState } from '../interfaces/OfficeState'

export default class PlayerEditCommand extends Command<OfficeState, Payload> {
  execute(data: Payload) {
    const { client, name } = data
    const player = this.room.state.players.get(client.sessionId)

    if (!player) return
    player.name = name
  }
}
