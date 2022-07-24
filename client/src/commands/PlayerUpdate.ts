import { Command } from '@colyseus/command'
import { PayloadInterface } from '../interfaces/Payload'
import { OfficeStateInterface } from '../interfaces/OfficeState'

export default class PlayerUpdateCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, x, y, anim } = data
    const player = this.room.state.players.get(client.sessionId)

    if (!player) return
    player.x = x
    player.y = y
    player.anim = anim
  }
}
