import { Command } from '@colyseus/command'
import { PayloadInterface } from '../interfaces/Payload'
import { ChatMessageEntity } from '../entities/schema/ChatMessage'
import { OfficeStateInterface } from '../interfaces/OfficeState'
export default class ChatMessageUpdateCommand extends Command<
  OfficeStateInterface,
  PayloadInterface
> {
  execute(data: PayloadInterface) {
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
