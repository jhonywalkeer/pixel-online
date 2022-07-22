import { Schema, ArraySchema, MapSchema } from '@colyseus/schema'
import { Player } from './Player'
import { Computer } from './Computer'
import { Whiteboard } from './Whiteboard'
import { ChatMessage } from './ChatMessage'

export interface OfficeState extends Schema {
  players: MapSchema<Player>
  computers: MapSchema<Computer>
  whiteboards: MapSchema<Whiteboard>
  chatMessages: ArraySchema<ChatMessage>
}
