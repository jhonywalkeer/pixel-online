import { Schema, SetSchema } from '@colyseus/schema'

export interface Whiteboard extends Schema {
  roomId: string
  connectedUser: SetSchema<string>
}
