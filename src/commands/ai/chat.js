import { SlashCommandBuilder } from "discord.js";
import { askGroq } from "../../services/groqService.js";

export const data = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("Talk to Mama Webster")
  .addStringOption((option) =>
    option.setName("message").setDescription("Your message").setRequired(true),
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const userMessage = interaction.options.getString("message");
  let response = await askGroq(userMessage);

  if (response.length > 1900) {
    response = response.slice(0, 1900) + "\n\n... (truncated)";
  }

  await interaction.editReply(response);
}
