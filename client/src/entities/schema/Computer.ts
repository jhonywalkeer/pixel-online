import { Schema, SetSchema, type } from '@colyseus/schema'
import { Computer } from '../../interfaces/Computer'

export class ComputerEntity extends Schema implements Computer {
  @type({ set: 'string' }) connectedUser = new SetSchema<string>()
}
