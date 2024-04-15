async function telegram() {
  const controller = require("../../app/Controllers/userController")
  const UserModel = require('../../app/Models/userModel')
  const TelegramBot = require('node-telegram-bot-api');
  require('dotenv').config();
  const axios = require('axios');

  const TOKEN = process.env.TELEGRAM_TOKEN;
  //const API_URL = 'https://core-ivory.vercel.app/'; // Replace with your actual API endpoint
  const BACKEND_API = 'https://core-ivory.vercel.app/'; // Replace with your actual API endpoint
  //const WEBSITE_URL = 'https://marketing-dashboard-beta.vercel.app/';
  const bot = new TelegramBot(TOKEN, { polling: true });

  const buyKeyboard = {
    inline_keyboard: [
      [
        { text: 'Buy', callback_data: 'buyButton' },
        { text: 'Sell', callback_data: 'sellButton' },
      ],
      [
        { text: 'Position', callback_data: 'positionButton' },
        { text: 'Limit Orders', callback_data: 'limitOrdersButton' },
        { text: 'DCA Orders', callback_data: 'DCAOrdersButton' },
      ],
      [
        { text: 'Swap Token', callback_data: 'SwaptokenButton' },
      ],
      [
        { text: 'Bridge', callback_data: 'bridgeButton' },
        { text: 'Referrals', callback_data: 'referralsButton' },
        { text: 'Withdraw', callback_data: 'withdrawButton' },
      ],
      [
        { text: '✅ Ethereum', callback_data: 'ethereumButton' },
        { text: 'Arbitrum', callback_data: 'arbitrumButton' },
        { text: 'Basechain', callback_data: 'basechainButton' },
      ],
      [
        { text: '⚙️Settings', callback_data: 'settingButton' },
        { text: '🗘Refresh', callback_data: 'refreshButton' },
        { text: '💼Balance', callback_data: 'balanceButton' },
      ],
    ],
  };

  const sellKeyboard = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: '🗘Refresh', callback_data: 'refreshButton' },
      ],
      [
        { text: 'w1', callback_data: 'w1Button' },
        { text: '✅ w2', callback_data: 'w2Button' },
        { text: 'w3', callback_data: 'w3Button' },
      ],
      [
        { text: 'Custom ✏️', callback_data: 'customButton' },
      ],
    ],
  };

  const UserdataKeyboard = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: '✖ Close', callback_data: 'closeButton' },
      ],
      [
        { text: 'SignUp', callback_data: 'w1Button' },
        { text: 'Login', callback_data: 'w2Button' },
      ],
    ],
  };

  const WithdrawKeyboard = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
      ],
      [
        { text: 'Transfer ⟠ETH', callback_data: 'transferButton' },
        { text: 'Transfer Toekn', callback_data: 'transferTokenButton' },
      ],
    ],
  };

  const settingKeyboard = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: '✖ Close', callback_data: 'closeButton' },
      ],
      [
        { text: 'Private Keys', callback_data: 'privateKeysButton' },
        { text: 'Import Wallet', callback_data: 'importWalletButton' },
      ],
      [
        { text: '🇬🇧 English', callback_data: 'usdcButton' },
      ],
    ],
  };

  const TransferToken = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: '🗘Refresh', callback_data: 'refreshButton' },
      ],
      [
        { text: '✅ W1', callback_data: 'w1Button' },
        { text: 'W2', callback_data: 'w2Button' },
        { text: 'W3', callback_data: 'w3Button' },
      ],
      [
        { text: 'Custom ✏️', callback_data: 'customButton' },
      ],
    ],
  };

  const Referrals = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
      ],
      [
        { text: 'Set Fee Receiver Wallet', callback_data: 'recivewallet' },
      ],
    ],
  };

  const Positions = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: '🗘Refresh', callback_data: 'refreshButton' },
      ],
      [
        { text: 'W1', callback_data: 'w1Button' },
        { text: '✅ W2', callback_data: 'w2Button' },
        { text: 'W3', callback_data: 'w3Button' },
      ],
    ],
  };

  const DCAOrders = {
    inline_keyboard: [
      [
        { text: '↰ Menu', callback_data: 'menuButton' },
        { text: 'X Remove All', callback_data: 'removeAllButton' },
      ],
      [
        { text: '[+]DCA', callback_data: 'DCAButton' },
      ],
    ],
  };

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("🚀 ~ bot.on ~ chatId:", chatId)
    const userId = msg.from.id;
    console.log("🚀 ~ bot.on ~ userId:", userId)
    if (msg.text === '/start') {
      bot.sendMessage(chatId, 'Welcome to the bot! Type something in the textbox:', {
        reply_markup: {
          keyboard: [
            [{ text: 'SignUp', request_contact: false, request_location: false }],
            [{ text: 'Start', request_contact: false, request_location: false }],
            [{ text: 'Buy', request_contact: false, request_location: false }],
            [{ text: 'Sell', request_contact: false, request_location: false }],
            [{ text: 'Withdraw', request_contact: false, request_location: false }],
            [{ text: 'Setting', request_contact: false, request_location: false }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    } else if (msg.text === 'SignUp') {
      bot.onText(/SignUp/, (msg) => {
        const chatId = msg.chat.id;
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

                if (password !== confirmPassword) {
                  bot.sendMessage(chatId, 'Passwords does not match. Please try again.');
                  return;
                }

                try {
                  const userExists = await UserModel.findOne({ email });
                  if (userExists) {
                    bot.sendMessage(chatId, 'User with this email already exists.');
                    return;
                  }

                  // Register a new user
                  const response = await axios.post(`${BACKEND_API}/signup`, {
                    name,
                    email,
                    password,
                    confirmPassword,
                    chatId
                  });
                  console.log("🚀 ~ bot.once ~ response:", response)
                  const { message, data } = response.data;
                  await bot.sendMessage(chatId, `User registered successfully. Email: ${data.email}`);

                  // Ask the user to provide their email for verification
                  bot.sendMessage(chatId, 'Please provide your email:');
                  bot.once('message', async (emailMsg) => {
                    const email = emailMsg.text;

                    // Ask the user for OTP
                    bot.sendMessage(chatId, 'Please Check Your Email & Enter your OTP:');
                    bot.once('message', async (otpMsg) => {
                      const otp = otpMsg.text;

                      try {
                        // Verify the user with OTP
                        const response = await axios.post(`${BACKEND_API}/verify`, {
                          email,
                          otp,
                        });

                        if (response.data.status === true) {
                          const { message, data } = response.data;
                          await bot.sendMessage(chatId, `User verified successfully`);
                          // Retrieve the wallet address from the database
                          const user = await UserModel.findOne({ email: email });
                          console.log("🚀 ~ bot.once ~ user:", user)
                          const wallet = user ? user.wallet : null;

                          if (wallet) {
                            await bot.sendMessage(chatId, `This is Your WalletAddress : ${wallet}`);
                          } else {
                            await bot.sendMessage(chatId, `User wallet address not available.`);
                          }
                        } else if (response.data.status === false) {
                          bot.sendMessage(chatId, `Invalid OTP. Please enter a valid OTP.`);
                        }
                      } catch (error) {
                        console.error('Error:', error.message);
                        bot.sendMessage(chatId, `An error occurred while verifying the user: ${error.message}`);
                      }
                    });
                  });
                } catch (error) {
                  console.error('Error:', error.message);
                  bot.sendMessage(chatId, `An error occurred while registering the user: ${error.message}`);
                }
              });
            });
          });
        });
      });



      bot.onText(/\/login/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Please provide your email:');
        bot.once('message', async (emailMsg) => {
          const email = emailMsg.text;
          bot.sendMessage(chatId, 'Please provide your password:');
          bot.once('message', async (passwordMsg) => {
            const password = passwordMsg.text;
            try {
              // Login the user
              const response = await axios.post(`${BACKEND_API}/login`, {
                email,
                password,
              });
              if (response.data.status === true) {
                // Send a message with an inline keyboard button to redirect to the website
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
      });

    } else if (msg.text === 'Start') {
      const messageText = `ETH: $3293 ═ BTC: $66867 ═ Gas: 12 gwei
      🦄 WaveBot | Website  | Tutorials | Solana Bot 🦄
      
      ══ Your Wallets ══
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da

      ‧‧────────────────‧‧
      Main Bot | Backup #1 | Backup #2 | Backup #3`;
      bot.sendMessage(chatId, messageText, { reply_markup: JSON.stringify(buyKeyboard) });

    } else if (msg.text === 'Buy') {
      const messageText = `ETH: $3293 ═ BTC: $66867 ═ Gas: 12 gwei
      🦄 WaveBot | Website  | Tutorials | Solana Bot 🦄
      
      ══ Your Wallets ══
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da

      ‧‧────────────────‧‧
      Main Bot | Backup #1 | Backup #2 | Backup #3`;
      bot.sendMessage(chatId, messageText, { reply_markup: JSON.stringify(buyKeyboard) });

    } else if (msg.text === 'Sell') {
      const messageText = `
      ══ Select a token to sell | Chain: Ethereum ══
      Wallet: w2(0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da)

      No token found (value > $10)
      
      Page: 1/1 
      ‧‧────────────────‧‧
      If you do not see your token:
      1. Check your selected wallet.
      2. Click Custom ✏️ to sell with custom token address.`
      bot.sendMessage(chatId, messageText, { reply_markup: JSON.stringify(sellKeyboard) });

    } else if (msg.text === 'Withdraw') {
      const messageText = `ETH: $3293 ═ BTC: $66867 ═ Gas: 12 gwei
      🦄 WaveBot | Website  | Tutorials | Solana Bot 🦄
      
      ══ Your Wallets ══
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
      
      w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
      0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da

      ‧‧────────────────‧‧
      Main Bot | Backup #1 | Backup #2 | Backup #3`;
      bot.sendMessage(chatId, messageText, { reply_markup: JSON.stringify(WithdrawKeyboard) });

    } else {
      bot.sendMessage(chatId, `You typed: ${msg.text}`);
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;
    let WebSiteLink = 'https://marketing-dashboard-beta.vercel.app/';

    switch (data) {
      case 'buyButton':
        bot.sendMessage(chatId, '✏️ Enter the token address you want to buy:');
        break;
      case 'sellButton':
        bot.sendMessage(chatId, `
        ══ Select a token to sell | Chain: Ethereum ══
        Wallet: w2(0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da)
  
        No token found (value > $10)
        
        Page: 1/1 
        ‧‧────────────────‧‧
        If you do not see your token:
        1. Check your selected wallet.
        2. Click Custom ✏️ to sell with custom token address.`, { reply_markup: JSON.stringify(sellKeyboard) });
        break;
      case 'menuButton':
        bot.sendMessage(chatId, `
        ETH: $3293 ═ BTC: $66867 ═ Gas: 12 gwei
        🦄 WaveBot | Website  | Tutorials | Solana Bot 🦄
        
        ══ Your Wallets ══
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
        
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
        
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
  
        ‧‧────────────────‧‧
        Main Bot | Backup #1 | Backup #2 | Backup #3`
          , { reply_markup: JSON.stringify(buyKeyboard) });
        break;
      case 'closeButton':
        bot.editMessageText('Menu closed.', { chat_id: chatId, message_id: messageId });
        break;
      case 'importWalletButton':
        bot.sendMessage(chatId, 'Click [here](' + WebSiteLink + ') to import your wallet.', { parse_mode: 'Markdown' });
        break;
      case 'settingButton':
        bot.sendMessage(chatId, '═ Settings ═', { reply_markup: JSON.stringify(settingKeyboard) });
        break;
      case 'withdrawButton':
        bot.sendMessage(chatId, `
        ETH: $3293 ═ BTC: $66867 ═ Gas: 12 gwei
        🦄 WaveBot | Website  | Tutorials | Solana Bot 🦄
        
        ══ Your Wallets ══
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
        
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
        
        w1:ETH: ⟠ 0($0) | ARB: ⟠0 | BASE: ⟠0 
        0xFEa2363E4A652f2E1eF591736D19D5f7851Aa8Da
  
        ‧‧────────────────‧‧
        Main Bot | Backup #1 | Backup #2 | Backup #3`, { reply_markup: JSON.stringify(TransferToken) });
        break;
      case 'positionButton':
        bot.sendMessage(chatId, `
        ═ Your Positions | Chain: Ethereum ═
        Wallet: w2 (0xFEa2..a8Da)
        
        No tokens found (value ≥ $10).

        Page: 1/1`, { reply_markup: JSON.stringify(Positions) });
        break;
      case 'DCAButton':
        bot.sendMessage(chatId, '✏️ Enter the token address you want to buy:');
        break;
      case 'DCAOrdersButton':
        bot.sendMessage(chatId, '═ DCA Orders  |  Total: 0 ═', { reply_markup: JSON.stringify(DCAOrders) });
        break;
      case 'customButton':
        bot.sendMessage(chatId, '✏️ Enter token address to sell.');
        break;
      case 'removeAllButton':
        bot.sendMessage(chatId, '✅ Removed all open dca orders, please wait for transactions to confirm.');
        break;
      case 'referralsButton':
        bot.sendMessage(chatId, `
        ═ Referrals | Refer Users & Earn ═
        Share your referral link(s) and earn 25% of swap fees from users who click your link. Withdraw earnings using your Fee Receiver Wallet.
        
        Fee Receiver Wallet: Not Set
        
        Link #1:https://marketing-dashboard-beta.vercel.app/ `, { reply_markup: JSON.stringify(Referrals) });
        break;
      case 'transferTokenButton':
        bot.sendMessage(chatId, `
        ═ Transfer Token ═
        Select a token from Etherscanto transfer:
        
        ‧‧────────────────‧‧
        If you do not see your token:
        1. Check your selected wallet.
        2. Click Custom ✏️ to sell with custom token address.`, { reply_markup: JSON.stringify(TransferToken) });
        break;
      case 'basechainButton':
        bot.sendMessage(chatId, `Click Custom ✏️ to sell with custom token address.`, { reply_markup: JSON.stringify(UserdataKeyboard) });
        break;
      case 'SwaptokenButton':
        let fromtoken
        let totoken
        let amountIn
        let chainId
        bot.sendMessage(chatId, 'ChainId:');
        bot.once('message', async (chainId) => {
          chainId = chainId.text;
          console.log("🚀 ~ bot.once ~ chainId:", chainId)
        bot.sendMessage(chatId, 'from Token:');
        bot.once('message', async (fromToken) => {
          fromtoken = fromToken.text;
          bot.sendMessage(chatId, 'To Token:');
          bot.once('message', async (totoken) => {
            totoken = totoken.text;
            bot.sendMessage(chatId, 'amount in:');
            bot.once('message', async (amountIn) => {
              // console.log("🚀 ~ bot.once ~ amountIn:", amountIn)
              amountIn = amountIn.text;
              const swaptoken = await controller.mainswap(fromtoken, totoken, amountIn ,chainId)
              // console.log("🚀 ~ bot.once ~ swaptoken:", swaptoken)
              bot.sendMessage(chatId,`transection hash : ${swaptoken}`);
              // bot.sendMessage(chatId,`transection successfully`);
            })
          })
        })
      })
        break;
      case 'balanceButton':
        bot.sendMessage(chatId, 'Please provide your Wallet Address:');
        bot.once('message', async (walletmessage) => {
          console.log("🚀 ~ bot.once ~ emailMsg:", walletmessage)
          const wallet = walletmessage.text;
          console.log("🚀 ~ bot.once ~ wallet:", wallet)
          const balancedata = await controller.fetchBalance(wallet)
          let message = "Balance:\n";
          balancedata.forEach((item, index) => {
            message += `${index + 1}. Name: ${item.name}, Amount: ${item.balance}\n`; // Modify this based on your object structure
          });
          bot.sendMessage(chatId, message);
        })
        break;
      default:
        console.log(`Unknown button clicked: ${data}`);
    }
  });
  console.log('Bot started!');
  console.log('Server running');
}

module.exports = {
  telegram
}

