const express = require('express');
const { Telegraf } = require('telegraf');
const path = require('path');

const BOT_TOKEN = '8052888670:AAHtnXNS1d75c89BOI3H7CzLO0OPSoX8VK4';
const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

// Статика для Mini App
app.use(express.static(path.join(__dirname, '../frontend')));

// Телеграм бот
bot.start((ctx) => {
    ctx.reply('Привет! Нажмите кнопку, чтобы вызвать мото-такси.', {
        reply_markup: {
            keyboard: [[{ text: "🚖 Вызвать такси", web_app: { url: "http://localhost:3000" } }]],
            resize_keyboard: true
        }
    });
});

// Получение данных из Mini App
app.post("/send-data", (req, res) => {
    const { phone } = req.body;
    bot.telegram.sendMessage(123456789, `📞 Новый заказ: ${phone}`); // Заменить на ID администратора
    res.sendStatus(200);
});

bot.launch();
app.listen(3000, () => console.log('🚀 Сервер запущен на http://localhost:3000'));

// Закрываем бота корректно при выходе
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
