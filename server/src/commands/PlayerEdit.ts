import { Command } from '@colyseus/command'
import { PayloadInterface } from '../interfaces/Payload'
import { OfficeStateInterface } from '../interfaces/OfficeState'

export default class PlayerEditCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, name } = data
    const player = this.room.state.players.get(client.sessionId)

    if (!player) return
    player.name = name
  }
}
