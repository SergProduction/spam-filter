const Telegraf = require('telegraf')
const env = require('dotenv').config().parsed

const token = env.token

const bot = new Telegraf(token)

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})

bot.command('spam', (ctx) => {
  console.log(ctx.message.reply_to_message.text)
  ctx.reply('ok')
})

bot.hears('hi', (ctx) => ctx.reply('Hey there!'))

bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.startPolling()