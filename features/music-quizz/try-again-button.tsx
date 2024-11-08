import { Button } from "@/components/ui/button";
import { getRandomTime } from "@/lib/utils";
import { nbTriesAtom } from "@/state/music-quizz";
import type { YouTubePlayer } from "@/types/Youtube";
import { useAtom } from "jotai";
import type { YouTubeEvent } from "react-youtube";

interface TryAgainButtonProps {
	player: YouTubePlayer | null;
	loadVideos: (e: YouTubeEvent) => void;
}

const TryAgainButton = ({ player, loadVideos }: TryAgainButtonProps) => {
	const [, setTries] = useAtom(nbTriesAtom);

	return (
		<Button
			onClick={async () => {
				player?.setShuffle(true);
				player?.nextVideo();

				do {
					await new Promise((resolve) => setTimeout(resolve, 100));
				} while (!player?.getVideoData().video_id);

				loadVideos({ target: player } as YouTubeEvent);
				player?.seekTo(getRandomTime(), true);
				setTries((t) => t + 1);
			}}
		>
			try to load again
		</Button>
	);
};

export default TryAgainButton;
