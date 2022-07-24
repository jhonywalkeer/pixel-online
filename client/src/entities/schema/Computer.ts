import { Schema, SetSchema, type } from '@colyseus/schema'
import { ComputerInterface } from '../../interfaces/Computer'

export class ComputerEntity extends Schema implements ComputerInterface {
  @type({ set: 'string' }) connectedUser = new SetSchema<string>()
}
