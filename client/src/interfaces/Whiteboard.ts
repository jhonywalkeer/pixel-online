import { Schema, SetSchema } from '@colyseus/schema'

export interface WhiteboardInterface extends Schema {
  roomId: string
  connectedUser: SetSchema<string>
}
