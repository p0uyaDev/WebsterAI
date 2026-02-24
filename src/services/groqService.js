import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(prompt) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "groq/compound",
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || "No response.";
}
