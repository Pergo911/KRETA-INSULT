import { DiscordRequest } from './utils.js';

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;

  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      const installedNames = data.map((c) => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {
        console.log(`Command named "${command['name']}" not installed. Installing...`);
        InstallGuildCommand(appId, guildId, command);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
}

// Uninstalls a command
export async function UninstallGuildCommand(appId, guildId, commandId) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${commandId}`;
  // remove command
  try {
    await DiscordRequest(endpoint, { method: 'DELETE' });
  } catch (err) {
    console.error(err);
  }
}

// insult command handler
export const INSULT_COMMAND = {
  name: 'insult',
  description: 'Ereszd ellenfeledre a legdurvább kifejezéseket!',
  options: [
    {
      type: 6,
      name: 'user',
      description: 'Válaszd ki a célpontot!',
      required: false,
    },

    {
      type: 4,
      name: 'adjective_count',
      description: 'Hány szemetgyönyörködtető melléknév legyen a kifejezésben?',
      required: false,
    }
  ],
  type: 1,
};

// Repeat insult
export const REPEAT_INSULT_COMMAND = {
  name: 'firing-mode',
  description: 'A következő csapás ismétlődik! Vigyázz, mert ebbe még te is belefulladhatsz!',
  options: [
    {
      type: 4,
      name: 'firing_mode',
      description: 'Válaszd ki a tüzelési módot!',
      required: true,
      choices: [
        {
          name: 'Single-fire',
          value: 0,
        },
        {
          name: 'Burst',
          value: 1,
        },
        {
          name: 'Full-auto',
          value: 2,
        },
      ],
    },
  ],
  type: 1,
};

// Stop repeat insult
export const STOP_REPEAT_INSULT_COMMAND = {
  name: 'firestop',
  description: 'Engedd el a ravaszt.',
  type: 1,
};