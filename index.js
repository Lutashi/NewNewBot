const { 
    Telegraf,
    Markup
} = require('telegraf');
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start(async (ctx) => {
    
    try{
        await ctx.reply(`Здравствуйте, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`)
        await ctx.replyWithHTML('Что вы хотите сделать?', Markup.inlineKeyboard(
        [
                [Markup.button.callback('Настроить профиль', 'btn_1'), Markup.button.callback('Пока что ничего', 'btn_2')]
        ]
        
    ))
    } catch(e){
        console.error(e)
    }
    
    
})
bot.help((ctx) => ctx.reply(text.commands))
bot.command('settings', async (ctx) =>  {
    try{
        await ctx.replyWithHTML('Что вы хотите сделать?', Markup.inlineKeyboard(
        [
                [Markup.button.callback('Настроить профиль', 'btn_1'), Markup.button.callback('Пока что ничего', 'btn_2')]
        ]
        
    ))
    } catch(e){
        console.error(e)
    }})
let replySaid = false
bot.action('btn_1', async (ctx) => {
        
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Как вас зовут?', {
            disable_web_page_preview: true
        })
        bot.on("message", async ctx => {
            if(!replySaid){
                replySaid = true
                await ctx.replyWithHTML(`${ctx.update.message.text} ваше имя, да?`, Markup.inlineKeyboard(
                    [
                            [Markup.button.callback('Да', 'btn_3'), Markup.button.callback('Нет', 'btn_4')]
                    ]
                    
                ))
            }
            
        });
        
        
    } catch(e){
        console.error(e)
    }
    
})
bot.action('btn_4', async (ctx) => {
    replySaid = false
    await ctx.replyWithHTML('Как вас зовут?', {
        disable_web_page_preview: true
    })
    bot.on("message", async ctx => {
        if(!replySaid){
            replySaid = true
            await ctx.replyWithHTML(`${ctx.update.message.text} ваше имя, да?`, Markup.inlineKeyboard(
                [
                        [Markup.button.callback('Да', 'btn_3'), Markup.button.callback('Нет', 'btn_4')]
                ]
                
            ))
        }
        
    });
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));