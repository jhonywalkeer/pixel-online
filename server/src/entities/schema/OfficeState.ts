import { Schema, ArraySchema, type, MapSchema } from '@colyseus/schema'

import { OfficeStateInterface } from '../../interfaces/OfficeState'

import { PlayerEntity } from './Player'
import { ComputerEntity } from './Computer'
import { WhiteboardEntity } from './Whiteboard'
import { ChatMessageEntity } from './ChatMessage'

export class OfficeStateEntity extends Schema implements OfficeStateInterface {
  @type({ map: PlayerEntity })
  players = new MapSchema<PlayerEntity>()

  @type({ map: ComputerEntity })
  computers = new MapSchema<ComputerEntity>()

  @type({ map: WhiteboardEntity })
  whiteboards = new MapSchema<WhiteboardEntity>()

  @type([ChatMessageEntity])
  chatMessages = new ArraySchema<ChatMessageEntity>()
}
