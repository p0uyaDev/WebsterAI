import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { execute as chatExecute } from "./commands/ai/chat.js";
import { askGroq } from "./services/groqService.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "chat") {
    await chatExecute(interaction);
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_API);
