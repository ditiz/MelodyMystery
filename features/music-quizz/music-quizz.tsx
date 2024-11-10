"use client";

import Loader from "@/components/ui/Loader";
import useFetchVideoInfos from "@/hooks/useFetchVideoInfos";
import { playerAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import Actions from "./actions";
import Choices from "./choices";
import DisplayScore from "./display-score";
import Result from "./result";
import YoutubePlayers from "./youtube-players";

const MusicElement = () => {
	const [player] = useAtom(playerAtom);

	useFetchVideoInfos();

	return (
		<article className="flex flex-col items-center gap-6">
			{player ? (
				<>
					<DisplayScore />
					<Choices />
					<Result />
					<Actions />
				</>
			) : (
				<Loader />
			)}
			<YoutubePlayers />
		</article>
	);
};

export default MusicElement;
