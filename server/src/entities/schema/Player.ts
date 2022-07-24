import { Schema, type } from '@colyseus/schema'
import { PlayerInterface } from '../../interfaces/Player'

export class PlayerEntity extends Schema implements PlayerInterface {
  @type('string') name = ''
  @type('number') x = 705
  @type('number') y = 500
  @type('string') anim = 'adam_idle_down'
  @type('boolean') readyToConnect = false
  @type('boolean') videoConnected = false
}
