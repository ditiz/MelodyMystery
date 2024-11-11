"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { playlistHistory } from "@/lib/constants";
import { cleanYoutubeVideoUrl } from "@/lib/utils";
import { errorsAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessages from "./errors-message";

const PlaylistInput = () => {
	const [errors, setErrors] = useAtom(errorsAtom);

	const [input, setInput] = useState("");

	const router = useRouter();

	const handleStart = () => {
		let playlistId = input.trim();

		// clean url
		if (playlistId.includes("https://www.youtube.com/playlist")) {
			playlistId = playlistId.replace(
				"https://www.youtube.com/playlist?list=",
				"",
			);
		} else if (playlistId.startsWith("https://www.youtube.com/watch")) {
			// biome-ignore lint/style/noNonNullAssertion: new warning
			playlistId = cleanYoutubeVideoUrl(playlistId)! ?? playlistId;
		}

		if (!playlistId) {
			setErrors((e) => [
				...e,
				{
					type: "destructive",
					message: "You have to give a youtube playlist identifier",
				},
			]);
			return;
		}

		localStorage.setItem(
			playlistHistory,
			`${localStorage.getItem(playlistHistory) ?? ""};${playlistId}`,
		);

		router.push(`/quizz/${playlistId}`);
	};

	return (
		<article className={`grid ${errors.length ? "gap-6" : ""} w-80`}>
			<ErrorMessages />

			<Card className="grid gap-2 bg-muted/50">
				<CardHeader>
					<h2 className="text-2xl font-bold pb-2">Custom Playlist</h2>
				</CardHeader>
				<CardContent>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<p className="flex m-2 gap-2">
									Playlist id
									<CircleHelp />
								</p>
							</TooltipTrigger>
							<TooltipContent>
								<h2>How to Get a YouTube Playlist ID</h2>
								<p>1. Open the playlist on YouTube.</p>
								<p>
									2. Look at the URL, e.g.,{" "}
									<code>
										https://www.youtube.com/playlist?list=PL9tY0BWXOZFta3_NWugU1o72a6Ae-bD7V
									</code>
								</p>
								<p>
									3. The ID is the part after <code>list=</code>, here:{" "}
									<strong>PL9tY0BWXOZFta3_NWugU1o72a6Ae</strong>
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<Input onChange={(e) => setInput(e.target.value)} />
				</CardContent>
				<CardFooter>
					<Button className="w-full" onClick={handleStart}>
						Start the game
					</Button>
				</CardFooter>
			</Card>
		</article>
	);
};

export default PlaylistInput;
