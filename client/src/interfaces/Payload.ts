import { Client } from 'colyseus'

export interface Payload {
  client: Client
  content: string
}
