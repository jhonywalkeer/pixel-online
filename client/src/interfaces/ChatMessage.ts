import { Schema } from '@colyseus/schema'

export interface ChatMessage extends Schema {
  author: string
  createdAt: number
  content: string
}
