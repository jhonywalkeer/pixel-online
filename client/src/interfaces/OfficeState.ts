import { Schema, ArraySchema, MapSchema } from '@colyseus/schema'
import { PlayerInterface } from './Player'
import { ComputerInterface } from './Computer'
import { WhiteboardInterface } from './Whiteboard'
import { ChatMessageInterface } from './ChatMessage'

export interface OfficeStateInterface extends Schema {
  players: MapSchema<PlayerInterface>
  computers: MapSchema<ComputerInterface>
  whiteboards: MapSchema<WhiteboardInterface>
  chatMessages: ArraySchema<ChatMessageInterface>
}
