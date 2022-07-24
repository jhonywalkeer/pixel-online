import { Schema } from '@colyseus/schema'

export interface ChatMessageInterface extends Schema {
  author: string
  createdAt: number
  content: string
}
