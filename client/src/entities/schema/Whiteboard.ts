import { Schema, SetSchema, type } from '@colyseus/schema'
import { Whiteboard } from '../../interfaces/Whiteboard'
import { getRoomId } from '../../helpers/getRoom'

export class WhiteboardEntity extends Schema implements Whiteboard {
  @type('string') roomId = getRoomId()
  @type({ set: 'string' }) connectedUser = new SetSchema<string>()
}
