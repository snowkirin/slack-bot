const { App } = require('@slack/bolt');


// User Token
// Bot Token
// App-level token

const appId = 'A02MKV82AF3';
const clientId = '2317231393845.2733994078513';
const clientSecret = '0781c46ab482a486518ed399789269f0';
const signingSecret = 'f6030cd291f534cf795d87c42bfde8ce'
const verificationToken = 'wY25P2FG3j4xAHYmSMvT3iT9';
// App Level Token??
const appToken = 'xapp-1-A02MKV82AF3-2723616831908-9088b3e194e6993470fc7648d6409be71a968d09f0e3b8b23cc5b4b6038d1794';
const userToken = 'xoxp-2317231393845-2332900928417-2723649449700-eb84d77a18f244adc9bf7dba2c3120d3';
const botToken = 'xoxb-2317231393845-2734028115521-rMLHfrqaEu9aiScz1fwvez9S';


const app = new App({
    token: botToken,
    signingSecret: signingSecret,
    socketMode: true,
    appToken: appToken,
    port: process.env.PORT || 3000
});

app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log('hello call');
    await say(`Hey there <@${message.user}>!`);
  });

(async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
  })();