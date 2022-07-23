import { Client } from 'colyseus'

export interface Payload {
  client: Client
  content: string
  computerId: string
  x: number
  y: number
  anim: string
  name: string
  whiteboardId: string
}
