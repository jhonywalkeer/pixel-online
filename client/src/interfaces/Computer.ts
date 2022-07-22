import { Schema, SetSchema } from '@colyseus/schema'

export interface Computer extends Schema {
  connectedUser: SetSchema<string>
}
