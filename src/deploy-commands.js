import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REST, Routes } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = await import(filePath);
    if ("data" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] ${filePath} missing 'data' export.`);
    }
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log("Registering slash commands...");

  await rest.put(Routes.applicationCommands(process.env.APP_ID), {
    body: commands,
  });

  console.log("Slash commands registered.");
} catch (error) {
  console.error(error);
}
