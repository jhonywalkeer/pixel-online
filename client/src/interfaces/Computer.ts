import { Schema, SetSchema } from '@colyseus/schema'

export interface ComputerInterface extends Schema {
  connectedUser: SetSchema<string>
}
