"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PLAYLIST_HISTORY } from "@/lib/constants";
import { cleanYoutubeVideoUrl } from "@/lib/utils";
import { errorsAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LabelInputPlaylistId from "./label-input-playlist-id";

const PlaylistInput = () => {
	const [, setErrors] = useAtom(errorsAtom);

	const [playlistId, setPlaylistId] = useState("");
	const [playlistName, setPlaylistName] = useState("");

	const router = useRouter();

	const handleStart = () => {
		let cleanedPlaylistId = playlistId.trim();
		let cleanedPlaylistName = playlistName.trim();

		// clean url
		if (cleanedPlaylistId.includes("https://www.youtube.com/playlist")) {
			cleanedPlaylistId = cleanedPlaylistId.replace(
				"https://www.youtube.com/playlist?list=",
				"",
			);
		} else if (cleanedPlaylistId.startsWith("https://www.youtube.com/watch")) {
			cleanedPlaylistId =
				// biome-ignore lint/style/noNonNullAssertion: new rule
				cleanYoutubeVideoUrl(cleanedPlaylistId)! ?? cleanedPlaylistId;
		}

		// handle error
		if (!cleanedPlaylistId) {
			setErrors((e) => [
				...e,
				{
					type: "destructive",
					message: "You have to give a youtube playlist identifier",
				},
			]);
			return;
		}

		if (!cleanedPlaylistName) {
			cleanedPlaylistName = "Custom Playlist";
		}

		localStorage.setItem(
			PLAYLIST_HISTORY,
			`${localStorage.getItem(PLAYLIST_HISTORY) ?? ""};${cleanedPlaylistName}:${cleanedPlaylistId}`,
		);

		router.push(`/quizz/${cleanedPlaylistId}`);
	};

	return (
		<article className={"grid"}>
			<Card className="grid gap-2 bg-muted/50">
				<CardHeader>
					<h2 className="text-2xl font-bold pb-2">Custom Playlist</h2>
				</CardHeader>
				<CardContent className="grid gap-4">
					<section>
						<LabelInputPlaylistId />
						<Input
							id="playlist-id"
							onChange={(e) => setPlaylistId(e.target.value)}
						/>
					</section>
					<section>
						<label
							className="flex mb-2 gap-2 align-center"
							htmlFor="playlist-name"
						>
							Playlist name <small>(optional)</small>
						</label>
						<Input
							id="playlist-name"
							onChange={(e) => setPlaylistName(e.target.value)}
						/>
					</section>
				</CardContent>
				<CardFooter className="mt-2">
					<Button className="w-full" onClick={handleStart}>
						Start the game
					</Button>
				</CardFooter>
			</Card>
		</article>
	);
};

export default PlaylistInput;
