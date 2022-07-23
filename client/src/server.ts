import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { Room } from './utils/enums/Rooms'

const port = Number(process.env.PORT || 2567)
const app = express()
const server = http.createServer(app)
const gameServer = new Server({ server })

app.user(cors())
app.use(express.json())
