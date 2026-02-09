import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { commandsJson } from './commands.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment.');
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

async function deploy() {
  try {
    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandsJson
      });
      console.log(`Registered ${commandsJson.length} guild commands.`);
    } else {
      await rest.put(Routes.applicationCommands(clientId), {
        body: commandsJson
      });
      console.log(`Registered ${commandsJson.length} global commands.`);
    }
  } catch (error) {
    console.error('Failed to register commands:', error);
    process.exit(1);
  }
}

deploy();
