"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function EmojiSuggester() {
	const [text, setText] = useState("");
	const [emojiCount, setEmojiCount] = useState("auto");
	const [suggestedEmojis, setSuggestedEmojis] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/emoji-suggester", {
			method: "POST",
			body: JSON.stringify({
				prompt: text,
				emojiCount,
			}),
		});

		const data = await response.json();
		setSuggestedEmojis(data);

		setIsLoading(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center text-indigo-700">
							EmojiSense
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="text"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Enter your text (max 500 characters)
								</label>
								<Textarea
									id="text"
									value={text}
									onChange={(e) => setText(e.target.value)}
									maxLength={500}
									rows={4}
									placeholder="Type your text here..."
									className="resize-none"
								/>
								<p className="text-xs text-gray-500 mt-1">
									{text.length}/500 characters
								</p>
							</div>
							<div>
								<label
									htmlFor="emojiCount"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Number of emojis
								</label>
								<Select value={emojiCount} onValueChange={setEmojiCount}>
									<SelectTrigger id="emojiCount">
										<SelectValue placeholder="Select emoji count" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="auto">Auto</SelectItem>
										<SelectItem value="1">1</SelectItem>
										<SelectItem value="2">2</SelectItem>
										<SelectItem value="3">3</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button
								type="submit"
								disabled={isLoading || text.length === 0}
								className="w-full"
							>
								{isLoading ? "Suggesting..." : "Suggest Emojis"}
							</Button>
						</form>
						<div className="mt-6">
							<h2 className="text-lg font-semibold text-gray-700 mb-2">
								Suggested Emojis
							</h2>
							<div className="h-16 flex items-center justify-center">
								{isLoading ? (
									<div className="w-8 h-8 border-t-2 border-indigo-500 border-solid rounded-full animate-spin" />
								) : suggestedEmojis ? (
									<div className="text-4xl transition-all duration-300 ease-in-out">
										{suggestedEmojis}
									</div>
								) : (
									<div className="text-center text-gray-500">
										Your suggested emojis will appear here
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
				<p className="text-xs text-gray-500/50 mt-8 text-center">
					Made with ❤️ by{" "}
					<a
						href="https://jose-donato.deno.dev"
						className="text-indigo-600/50 hover:underline"
					>
						José Donato
					</a>{" "}
					with the help of{" "}
					<a
						href="https://sdk.vercel.ai/"
						className="text-indigo-600/50 hover:underline"
					>
						AI SDK
					</a>{" "}
					+{" "}
					<a
						href="https://nextjs.org"
						className="text-indigo-600/50 hover:underline"
					>
						Next.js
					</a>{" "}
					+{" "}
					<a
						href="https://v0.dev"
						className="text-indigo-600/50 hover:underline"
					>
						v0
					</a>
					.<br /> Open source on{" "}
					<a
						href="https://github.com/jose-donato/emojisense"
						className="text-indigo-600/50 hover:underline"
					>
						GitHub
					</a>
					. If you like it, please give it a ⭐️!
				</p>
			</div>
		</div>
	);
}
