const { App } = require('@slack/bolt');

const SLACK_BOT_TOKEN="xoxb-2317231393845-2707095521495-XpA8eHz5ybNyyV77fJ16fUpk"
const SLACK_SIGNING_SECRET="d3048e7e6ecfd6b2679adabc0f7f5851"
const SLACK_APP_TOKEN="xapp-1-A02LT2LECUX-2715046698230-a520f47818744d29e0f6f5b8ac55f99018c201eea29b9f6bfc936f3a76120eac"

/* 
This sample slack application uses SocketMode
For the companion getting started setup guide, 
see: https://slack.dev/bolt-js/tutorial/getting-started 
*/

// Initializes your app with your bot token and app token
const app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: SLACK_APP_TOKEN // add this
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();