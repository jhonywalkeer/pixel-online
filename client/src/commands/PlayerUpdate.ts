import { Command } from '@colyseus/command'
import { Payload } from '../interfaces/Payload'
import { OfficeState } from '../interfaces/OfficeState'

export default class PlayerUpdateCommand extends Command<OfficeState, Payload> {
  execute(data: Payload) {
    const { client, x, y, anim } = data
    const player = this.room.state.players.get(client.sessionId)

    if (!player) return
    player.x = x
    player.y = y
    player.anim = anim
  }
}
