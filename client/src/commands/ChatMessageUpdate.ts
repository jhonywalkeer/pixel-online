import { Command } from '@colyseus/command'
import { ChatMessageEntity } from '../entities/schema/ChatMessage'
import { OfficeState } from '../interfaces/OfficeState'
import { Payload } from '../interfaces/Payload'
export default class ChatMessageUpdateCommand extends Command<OfficeState, Payload> {
  execute(data: Payload) {
    const { client, content } = data
    const player = this.room.state.players.get(client.sessionId)
    const chatMessages = this.room.state.chatMessages

    if (!chatMessages) return
    if (chatMessages.length >= 100) chatMessages.shift()

    const newMessage = new ChatMessageEntity()
    newMessage.author = player.name
    newMessage.content = content
    chatMessages.push(newMessage)
  }
}
