import crypto from 'crypto'
import dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import { Command } from './types.js'
import { fetchCommands } from './utils.js'

dotenv.config()

const bot: TelegramBot = new TelegramBot(process.env.BOT_TOKEN ?? '', { polling: true })

const commandList: Command[] = await fetchCommands()

const commandListRegExp: RegExp = new RegExp(commandList.map((c) => '\\/' + c.name).join('|'))

bot.onText(commandListRegExp, async (msg) => {
  const command: Command | undefined = commandList.find((c) => c.name === msg.text?.slice(1))

  if (command !== undefined) {
    bot.sendPhoto(msg.chat.id, './img/' + command.fileName, { reply_to_message_id: msg.message_id })
  }
})

bot.on('inline_query', async (query) => {
  const uuids: string[] = []
  const matches: Command[] = commandList.filter((c) => c.name.toLowerCase().includes(query.query.toLowerCase()))

  while (uuids.length !== matches.length) {
    const uuid: string = crypto.randomUUID()

    if (!uuids.includes(uuid)) {
      uuids.push(uuid)
    }
  }

  bot.answerInlineQuery(query.id, matches.map((c) => {
    const link: string = (process.env.GIT_LINK ?? '') + '/blob/main/img/' + c.fileName + '?raw=true'
    return { photo_url: link, thumb_url: link, id: uuids[matches.indexOf(c)], type: 'photo', description: c.info } as TelegramBot.InlineQueryResultPhoto
  }))
})
