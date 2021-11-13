// This example shows basic use of home tabs
// It uses an enabled app home and the app_home_opened event
// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const SLACK_BOT_TOKEN="xoxb-2317231393845-2721713159922-af6L5wbdjEQ7SxWkBwTdwoBs";
const SLACK_SIGNING_SECRET="e4cb1b4bd9183b8a5bed69846dab4154";
const SLACK_APP_TOKEN="xapp-1-A02M4MJETHT-2721718644819-5975b9899b4d045ba2a34f6b04e0dcac04d33b48fda00439bcdca0582e65cbdd";

const app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET
  });
// Message listener function called for messages containing "hello"
app.message('hello', async ({ message, say }) => {
    await say({
      "text": `👋 Hey there <@${message.user}>`,
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
            "text": `👋 Hey there <@${message.user}>`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me",
              "emoji": true
            },
            "action_id": "click_me_button"
          }
        }
      ]
    });
  });
  
  // Action listener function called when an interactive component with action_id of “click_me_button” is triggered
  app.action('click_me_button', async ({ ack, body, client, say }) => {
    // Acknowledge action request before anything else
    await ack();
    
    let channelID = body.channel.id
    let userID = body.user.id
    
    // Respond to action with an ephemeral message
    await client.chat.postEphemeral({
      channel: channelID,
      user: userID,
      text: `<@${userID}> clicked the button! 🎉`
    });
  });
  
  (async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
  
    console.log('⚡️ Bolt app is running!');
  })();
  