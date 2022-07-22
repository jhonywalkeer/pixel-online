import { Schema } from '@colyseus/schema'

export interface Player extends Schema {
  name: string
  x: number
  y: number
  anim: string
  readyToConnect: boolean
  videoConnected: boolean
}
