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
  const response = await askGroq(userMessage);

  await interaction.editReply(response);
}
