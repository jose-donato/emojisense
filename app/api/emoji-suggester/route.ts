import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const googleGenerativeAI = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
	const { prompt, emojiCount }: { prompt: string; emojiCount: string } =
		await req.json();

	const { text } = await generateText({
		model: googleGenerativeAI("gemini-1.5-flash-latest"),
		system: `You are an emoji suggester. Only include the emojis in your response ALWAYS.
You will be given a text and a number of emojis you should suggest.

The number may be "auto" or a number. If it is "auto", you should suggest as many emojis as possible to describe the text. If it is a number, you should suggest that many emojis.
`,
		prompt: `Text: ${prompt}
Emoji count: ${emojiCount}`,
	});

	console.log(text);

	return Response.json(text);
}
