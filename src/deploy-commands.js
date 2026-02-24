import "dotenv/config";
import { REST, Routes } from "discord.js";
import { data as chatData } from "./commands/ai/chat.js";

const commands = [chatData.toJSON()];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_API);

try {
  console.log("Registering slash commands...");

  await rest.put(Routes.applicationCommands(process.env.APP_ID), {
    body: commands,
  });

  console.log("Slash commands registered.");
} catch (error) {
  console.error(error);
}
