import { Schema, type } from '@colyseus/schema'
import { ChatMessageInterface } from '../../interfaces/ChatMessage'

export class ChatMessageEntity extends Schema implements ChatMessageInterface {
  @type('string') author = ''
  @type('number') createdAt = new Date().getTime()
  @type('string') content = ''
}
