"use client";

import { Button } from "@/components/ui/button";
import {
	choiceAtom,
	currentRoundAtom,
	currentVideoIdAtom,
	nbRoundAtom,
	nbTriesAtom,
	playerAtom,
	responseTimeAtom,
	videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

const Actions = () => {
	const [player] = useAtom(playerAtom);
	const [choice, setChoice] = useAtom(choiceAtom);
	const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
	const [, setVideos] = useAtom(videosAtom);
	const [currentRound, setCurrentRound] = useAtom(currentRoundAtom);
	const [nbRound] = useAtom(nbRoundAtom);
	const [, setNbTries] = useAtom(nbTriesAtom);
	const [, setResponseTime] = useAtom(responseTimeAtom);

	const router = useRouter();

	const start = () => {
		if (player?.playVideo) {
			player.playVideo();
			setCurrentVideoId(player?.getVideoData()?.video_id ?? null);
		}
	};

	const next = async () => {
		setChoice(null);
		setVideos([]);
		setNbTries(0);

		if (nbRound === currentRound) {
			setCurrentRound(1);
			router.push("/quizz/result");
			return;
		}

		player?.nextVideo();
		setCurrentVideoId(player?.getVideoData().video_id ?? null);

		setCurrentRound((r) => r + 1);
		setResponseTime(new Date());
	};

	return (
		<div className="flex gap-6">
			{!currentVideoId ? <Button onClick={start}>Start</Button> : null}
			{choice ? <Button onClick={next}>Next</Button> : null}
		</div>
	);
};

export default Actions;
