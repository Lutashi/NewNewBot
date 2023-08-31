const { 
    Telegraf,
    Markup
} = require('telegraf');
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('settings', async (ctx) =>  {
    try{
    await ctx.replyWithHTML('<b>Настройки</b>', Markup.inlineKeyboard(
    [
            [Markup.button.callback('Customize Profile', 'btn_1'), Markup.button.callback('Nothing yet', 'btn_2')]
    ]

))
} catch(e){
    console.error(e)
}
});
function addActionBot(name, src, text){
    bot.action(name, async (ctx) => {
        
        try {
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
            
            
        } catch(e){
            console.error(e)
        }
        
    })
}

addActionBot('btn_1', false, text.text)
addActionBot('btn_2', false, text.text2)




bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));