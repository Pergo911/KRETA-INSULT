import 'dotenv/config';
import express from 'express';
import {InteractionType, InteractionResponseType,} from 'discord-interactions';
import {DiscordRequest, VerifyDiscordRequest} from './utils.js';
import {INSULT_COMMAND, HasGuildCommands} from './commands.js';
import {constructInsult} from './constructInsult.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data, member } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    // "insult" guild command
    if (name === 'insult') {

      // Get the number of adjectives from the command options
      let a = -1;
      if (data.options) {
        for (let option of data.options) {
          if (option.name === 'adjective_count') {
            a = option.value;
          }
        }
      }
      // Default value
      if (a < 0) {
        a = 1;
      }

      // Get the user ID from the command options
      let user = '';
      if (data.options) {
        for (let option of data.options) {
          if (option.name === 'user') {
            user = option.value;
          }
        }
      }


      let userData;
      // Get target user's name
      if (user !== '') {
        const userRes = await DiscordRequest(`users/${user}`, { method: 'GET' });
        userData = await userRes.json();
      }
      else {targetName = '[Generic User]';}
      // Log the request
      console.log(`New insult from ${member.user.username}#${member.user.discriminator} to ${userData.username}#${userData.discriminator} with ${a} adjectives`);

      // Send the insult
      if (user !== '') {
        // User-specific insult
        const insult = constructInsult(a, user);
        
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: insult,
          },
        });

      } else {
        // Generic insult
        const insult = constructInsult(a);
        
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: insult,
          },
        });
        
      }
    }
  }
});

app.listen(PORT, () => {
  console.log('App is running. (port', PORT+')');

  // Check if guild commands from commands.js are installed (if not, install them)
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    INSULT_COMMAND,
  ]);
});
