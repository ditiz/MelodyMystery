"use client";

import { Button } from "@/components/ui/button";
import { getRandomTime } from "@/lib/utils";
import {
	choiceAtom,
	currentVideoIdAtom,
	errorsAtom,
	nbTriesAtom,
	playerAtom,
	videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import YouTube, { type YouTubeEvent } from "react-youtube";
import TryAgainButton from "./try-again-button";

const get5SecondsTimer = () => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 5);
	return time;
};

const YoutubePlayers = () => {
	const [show, setShow] = useState(false);

	const { playlistId } = useParams();
	const router = useRouter();

	const [player, setPlayer] = useAtom(playerAtom);
	const [videos, setVideos] = useAtom(videosAtom);
	const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
	const [, setError] = useAtom(errorsAtom);
	const [choice] = useAtom(choiceAtom);
	const [tries] = useAtom(nbTriesAtom);

	const { restart, seconds } = useTimer({
		expiryTimestamp: get5SecondsTimer(),
	});

	useEffect(() => {
		if (videos.length === 0) restart(get5SecondsTimer());
	}, [videos.length, restart]);

	const loadVideos = (e: YouTubeEvent) => {
		// main videos
		const videoId = e.target.getVideoData().video_id;
		const videoName = e.target.getVideoData().title;
		const mainVideo = { id: videoId, name: videoName };

		// load other videos
		const playlistIds = e.target.getPlaylist();
		if (playlistIds) {
			if (playlistIds.length < 4) {
				setError((errs) => [
					...errs,
					{
						type: "default",
						message: "Playlist must have at least 4 videos",
					},
				]);
				router.push("/");
				return;
			}

			let randomVideos: { id: string }[];
			do {
				randomVideos = [...Array(3)]
					.map(
						() => playlistIds[Math.floor(Math.random() * playlistIds.length)],
					)
					.map((id) => ({ id }));
			} while (
				[...randomVideos, mainVideo].filter(
					(v, i, a) => a.findIndex((t) => t.id === v.id) === i,
				).length < 4
			);

			const randomisedVideo = [...randomVideos, mainVideo].sort(
				() => 0.5 - Math.random(),
			);

			setVideos(randomisedVideo);
		}
	};

	return (
		<article className="flex flex-col items-center gap-2">
			{!choice && videos.length !== 4 && seconds === 0 ? (
				<div className="flex gap-2">
					<Button
						className={`${tries > 3 ? "block" : "hidden"}`}
						onClick={() => setShow((v) => !v)}
					>
						Show players
					</Button>
					<TryAgainButton player={player} loadVideos={loadVideos} />
				</div>
			) : null}

			<section className={`${show ? "flex" : "hidden"} flex-col lg:flex-row`}>
				<YouTube
					onReady={async (e: YouTubeEvent) => {
						e.target.setShuffle(true);
						e.target.nextVideo();
						e.target.pauseVideo();

						// Reduce the volume to 50%
						e.target.setVolume(50);

						// wait for the next video to be loaded
						while (!e.target.getVideoData().video_id) {
							await new Promise((resolve) => setTimeout(resolve, 100));
						}

						setPlayer(e.target);
					}}
					onPlay={(e: YouTubeEvent) => {
						const videoDataId = e.target.getVideoData().video_id;

						if (videoDataId && videoDataId !== currentVideoId) {
							e.target.seekTo(getRandomTime(), true);
							loadVideos(e);
							setCurrentVideoId(videoDataId);
						}
					}}
					opts={{
						playerVars: {
							list: playlistId,
							listType: "playlist",
						},
						width: "320",
						height: "195",
					}}
				/>
			</section>
		</article>
	);
};

export default YoutubePlayers;
