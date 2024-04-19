const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const axios = require('axios');
const express = require('express')
const app = express();


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

app.all("*", (req, res) => {
    res.send("URL not found")
})

console.log('Bot started!');
console.log('Server running');


// const TelegramBot = require('node-telegram-bot-api');
// require('dotenv').config();
// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());

// const TOKEN = process.env.TOKEN; // Telegram Token
// const WEBSITE_URL = 'https://marketing-dashboard-beta.vercel.app/';
// const API_URL = process.env.BACKEND_URL; // Backend URL

// const bot = new TelegramBot(TOKEN);

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const userId = msg.from.id;
//     console.log("🚀 ~ bot.on ~ userId:", userId)

//     // Message handling logic
//     if (msg.text === '/start') {
//         bot.sendMessage(chatId, 'Welcome to the bot! Type something in the textbox:', {
//             reply_markup: {
//                 keyboard: [
//                     [{ text: 'SignUp', request_contact: false, request_location: false }],
//                 ],
//                 resize_keyboard: true,
//                 one_time_keyboard: true,
//             },
//         });
//     } else if (msg.text === 'SignUp') {
//         bot.sendMessage(chatId, 'Please provide your name:');
//         bot.once('message', async (nameMsg) => {
//             const name = nameMsg.text;
//             bot.sendMessage(chatId, 'Please provide your email:');
//             bot.once('message', async (emailMsg) => {
//                 const email = emailMsg.text;
//                 bot.sendMessage(chatId, 'Please provide your password:');
//                 bot.once('message', async (passwordMsg) => {
//                     const password = passwordMsg.text;
//                     bot.sendMessage(chatId, 'Please confirm your password:');
//                     bot.once('message', async (confirmPasswordMsg) => {
//                         const confirmPassword = confirmPasswordMsg.text;
//                         try {
//                             const response = await axios.post(`${API_URL}/signup`, {
//                                 name,
//                                 email,
//                                 password,
//                                 confirmPassword,
//                                 chatId
//                             });
//                             const { message, data } = response.data;
//                             if (data && data.email) {
//                                 await bot.sendMessage(chatId, `User registered successfully. Email: ${data.email}`);
//                                 bot.sendMessage(chatId, 'Please provide your email:');
//                                 bot.once('message', async (emailMsg) => {
//                                     const email = emailMsg.text;
//                                     bot.sendMessage(chatId, 'Please Check Your Email & Enter your OTP:');
//                                     bot.once('message', async (otpMsg) => {
//                                         const otp = otpMsg.text;
//                                         try {
//                                             const response = await axios.post(`${API_URL}/verify`, {
//                                                 email,
//                                                 otp,
//                                             });
//                                             if (response.data.status === true) {
//                                                 const { message, data } = response.data;
//                                                 await bot.sendMessage(chatId, `User verified successfully`);
//                                             } else if (response.data.status === false) {
//                                                 bot.sendMessage(chatId, `Invalid OTP. Please enter a valid OTP.`);
//                                             }
//                                         } catch (error) {
//                                             console.error('Error:', error.message);
//                                             bot.sendMessage(chatId, `An error occurred while verifying the user: ${error.message}`);
//                                         }
//                                     });
//                                 });
//                             } else {
//                                 bot.sendMessage(chatId, `Failed to register user. Please try again.`);
//                             }
//                         } catch (error) {
//                             console.error('Error:', error.message);
//                             bot.sendMessage(chatId, `An error occurred while registering the user: ${error.message}`);
//                         }
//                     });
//                 });
//             });
//         });
//     } else if (msg.text === 'Login') {
//         bot.sendMessage(chatId, 'Please provide your email:');
//         bot.once('message', async (emailMsg) => {
//             const email = emailMsg.text;
//             bot.sendMessage(chatId, 'Please provide your password:');
//             bot.once('message', async (passwordMsg) => {
//                 const password = passwordMsg.text;
//                 try {
//                     const response = await axios.post(`${API_URL}/login`, {
//                         email,
//                         password,
//                         chatId,
//                     });
//                     if (response.data.status === true) {
//                         bot.sendMessage(chatId, `Login successful!`, {
//                             reply_markup: JSON.stringify({
//                                 inline_keyboard: [
//                                     [{
//                                         text: 'Go to website',
//                                         url: WEBSITE_URL
//                                     }]
//                                 ]
//                             })
//                         });
//                     } else {
//                         bot.sendMessage(chatId, 'Invalid email or password. Please try again.');
//                     }
//                 } catch (error) {
//                     console.error('Error:', error.message);
//                     bot.sendMessage(chatId, `An error occurred while logging in: ${error.message}`);
//                 }
//             });
//         });
//     } else {
//         bot.sendMessage(chatId, `You typed: ${msg.text}`);
//     }
// });

// const WEBHOOK_URL = process.env.WEBHOOK_URL; // Your webhook URL
// console.log("🚀 ~ WEBHOOK_URL:", WEBHOOK_URL)
// bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

// app.post(`/bot${TOKEN}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

// app.all("*", (req, res) => {
//     res.send("URL not found")
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Bot started and webhook set up at port ${PORT}`);
// });
