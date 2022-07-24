import { Command } from '@colyseus/command'
import { PayloadInterface } from '../interfaces/Payload'
import { OfficeStateInterface } from '../interfaces/OfficeState'

export class ComputerAddUserCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, computerId } = data
    const computer = this.room.state.computers.get(computerId)
    const clientId = client.sessionId

    if (!computer || computer.connectedUser.has(clientId)) return
    computer.connectedUser.add(clientId)
  }
}

export class ComputerRemoveUserCommand extends Command<OfficeStateInterface, PayloadInterface> {
  execute(data: PayloadInterface) {
    const { client, computerId } = data
    const computer = this.state.computers.get(computerId)

    if (computer.connectedUser.has(client.sessionId)) {
      computer.connectedUser.delete(client.sessionId)
    }
  }
}
