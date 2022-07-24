import http from 'http'
import express from 'express'
import cors from 'cors'
import logger from './utils/functions/logger.js'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomEnum } from './utils/enums/Rooms'
import { Pixel } from './controllers/Environment'

const port = Number(process.env.PORT || 2567)
const app = express()
const server = http.createServer(app)
const gameServer = new Server({ server })

app.use(cors())
app.use(express.json())

gameServer.define(RoomEnum.LOBBY, LobbyRoom)
gameServer.define(RoomEnum.PUBLIC, Pixel, {
  name: 'Public Lobby',
  description: 'For making friends and familiarizing yourself with the controls',
  password: null,
  autoDispose: false,
})
gameServer.define(RoomEnum.CUSTOM, Pixel).enableRealtimeListing()

app.use('/colyseus', monitor())

gameServer.listen(port)
logger.info(`Listening on ws://localhost:${port}`)
