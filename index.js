// const { TELEGRAM_TOKEN , API_URL } = process.env
// const TELGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
// const URI = `/webhook/${TELEGRAM_TOKEN}`
// const WEBHOOK_URL =  API_URL+URI


// const  init = async () => {
//     const res = await axios.get(`${TELGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
//     telegram()
// }







const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const axios = require('axios');

const TOKEN = process.env.TOKEN; // Telegram Token
const WEBSITE_URL = 'https://marketing-dashboard-beta.vercel.app/';
const API_URL = process.env.BACKEND_URL; // Backend URL

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    console.log("🚀 ~ bot.on ~ userId:", userId)

    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot! Type something in the textbox:', {
            reply_markup: {
                keyboard: [
                    [{ text: 'SignUp', request_contact: false, request_location: false }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    } else if (msg.text === 'SignUp') {
        bot.sendMessage(chatId, 'Please provide your name:');
        bot.once('message', async (nameMsg) => {
            const name = nameMsg.text;
            bot.sendMessage(chatId, 'Please provide your email:');
            bot.once('message', async (emailMsg) => {
                const email = emailMsg.text;
                bot.sendMessage(chatId, 'Please provide your password:');
                bot.once('message', async (passwordMsg) => {
                    const password = passwordMsg.text;
                    bot.sendMessage(chatId, 'Please confirm your password:');
                    bot.once('message', async (confirmPasswordMsg) => {
                        const confirmPassword = confirmPasswordMsg.text;
                        try {
                            const response = await axios.post(`${API_URL}/signup`, {
                                name,
                                email,
                                password,
                                confirmPassword,
                                chatId
                            });
                            const { message, data } = response.data;
                            if (data && data.email) {
                                await bot.sendMessage(chatId, `User registered successfully. Email: ${data.email}`);
                                bot.sendMessage(chatId, 'Please provide your email:');
                                bot.once('message', async (emailMsg) => {
                                    const email = emailMsg.text;
                                    bot.sendMessage(chatId, 'Please Check Your Email & Enter your OTP:');
                                    bot.once('message', async (otpMsg) => {
                                        const otp = otpMsg.text;
                                        try {
                                            const response = await axios.post(`${API_URL}/verify`, {
                                                email,
                                                otp,
                                            });
                                            if (response.data.status === true) {
                                                const { message, data } = response.data;
                                                await bot.sendMessage(chatId, `User verified successfully`);
                                            } else if (response.data.status === false) {
                                                bot.sendMessage(chatId, `Invalid OTP. Please enter a valid OTP.`);
                                            }
                                        } catch (error) {
                                            console.error('Error:', error.message);
                                            bot.sendMessage(chatId, `An error occurred while verifying the user: ${error.message}`);
                                        }
                                    });
                                });
                            } else {
                                bot.sendMessage(chatId, `Failed to register user. Please try again.`);
                            }
                        } catch (error) {
                            console.error('Error:', error.message);
                            bot.sendMessage(chatId, `An error occurred while registering the user: ${error.message}`);
                        }
                    });
                });
            });
        });
    } else if (msg.text === 'Login') {
        bot.sendMessage(chatId, 'Please provide your email:');
        bot.once('message', async (emailMsg) => {
            const email = emailMsg.text;
            bot.sendMessage(chatId, 'Please provide your password:');
            bot.once('message', async (passwordMsg) => {
                const password = passwordMsg.text;
                try {
                    const response = await axios.post(`${API_URL}/login`, {
                        email,
                        password,
                        chatId,
                    });
                    if (response.data.status === true) {
                        bot.sendMessage(chatId, `Login successful!`, {
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{
                                        text: 'Go to website',
                                        url: WEBSITE_URL
                                    }]
                                ]
                            })
                        });
                    } else {
                        bot.sendMessage(chatId, 'Invalid email or password. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                    bot.sendMessage(chatId, `An error occurred while logging in: ${error.message}`);
                }
            });
        });
    } else {
        bot.sendMessage(chatId, `You typed: ${msg.text}`);
    }
});

console.log('Bot started!');
console.log('Server running');




