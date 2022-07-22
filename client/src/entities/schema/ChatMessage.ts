import { Schema, type } from '@colyseus/schema'
import { ChatMessage } from '../../interfaces/ChatMessage'

export class ChatMessageEntity extends Schema implements ChatMessage {
  @type('string') author = ''
  @type('number') createdAt = new Date().getTime()
  @type('string') content = ''
}
