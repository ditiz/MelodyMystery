"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playlistHistory } from "@/lib/constants";
import { errorsAtom, nbRoundAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { isNumber } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessages from "./errors-message";

const PlaylistInput = () => {
	const [nbRound, setNbRound] = useAtom(nbRoundAtom);
	const [, setErrors] = useAtom(errorsAtom);

	const [input, setInput] = useState("");
	const [localNbRound, setLocalNbRound] = useState<number>(nbRound);

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

		if (
			!isNumber(localNbRound) ||
			localNbRound < 0 ||
			Number.isNaN(localNbRound)
		) {
			setErrors((e) => [
				...e,
				{ type: "destructive", message: "Number of round invalid" },
			]);
			return;
		}

		localStorage.setItem(
			playlistHistory,
			`${localStorage.getItem(playlistHistory) ?? ""};${playlistId}`,
		);

		setNbRound(localNbRound);
		router.push(`/quizz/${playlistId}`);
	};

	return (
		<article className="grid gap-6 w-80">
			<ErrorMessages />

			<section className="grid gap-2">
				<div className="grid gap-2">
					<h2 className="text-2xl font-bold pb-2">Game</h2>
					<div>
						<h3 className="font-bold">Playlist id</h3>
						<small className="text-muted-foreground">
							Exemple: <span>PL3QJxphXG1iCzpP9KcZU8EG5Z8O3HNb6X</span>
						</small>
						<Input onChange={(e) => setInput(e.target.value)} />
					</div>
				</div>

				<div className="flex gap-2 items-center justify-between">
					<h3 className="font-bold">Number of round</h3>
					<Input
						type="number"
						className="w-24"
						value={localNbRound}
						onChange={(e) => {
							const value = Number.parseInt(e.target.value);
							setLocalNbRound(value);
						}}
					/>
				</div>
			</section>

			<Button onClick={handleStart}>Start the game</Button>
		</article>
	);
};

function cleanYoutubeVideoUrl(url: string) {
	const startIndex = url.indexOf("list=");

	if (startIndex === -1) return url;

	const endIndex = url.indexOf("&", startIndex);

	return url.substring(startIndex + 5, endIndex);
}
export default PlaylistInput;
