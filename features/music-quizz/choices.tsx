import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
	choiceAtom,
	currentVideoIdAtom,
	scoreAtom,
	videosAtom,
} from "@/state/music-quizz";
import clsx from "clsx";
import { useAtom } from "jotai";

const buttonsClassName = "h-auto lg:text-lg lg:p-6 break-words";

const buttonsColors = [
	"bg-green-400 hover:bg-green-600",
	"bg-orange-400 hover:bg-orange-600",
	"bg-teal-400 hover:bg-teal-600",
	"bg-purple-400 hover:bg-purple-600",
];

const Choices = () => {
	const [videos] = useAtom(videosAtom);

	if (videos.length !== 4) return null;
	if (videos.some((v) => !v.name)) return <Loader />;

	return (
		<section className="choice grid gap-6 grid-cols-1 lg:grid-cols-2 w-auto max-w-[90vh]">
			{videos.map((v, i) => (
				<ButtonChoice key={v.id} index={i} video={v} />
			))}
		</section>
	);
};

interface ButtonChoiceProps {
	index: number;
	video: { id: string; name?: string };
}
const ButtonChoice = ({ index, video }: ButtonChoiceProps) => {
	const [choice, setChoice] = useAtom(choiceAtom);
	const [currentVideoId] = useAtom(currentVideoIdAtom);
	const [, setScore] = useAtom(scoreAtom);

	const handleClick = (videoId: string) => {
		setChoice(videoId);
		if (videoId === currentVideoId) {
			setScore((s) => s + 100);
		}
	};

	const choiceIsCorrect = choice && video.id === currentVideoId;

	return (
		<Button
			className={clsx(
				buttonsClassName,
				buttonsColors[index],
				"outline outline-offset-2",
				choiceIsCorrect && "outline-green-500",
				choiceIsCorrect && choice !== currentVideoId && "outline-red-500",
			)}
			onClick={() => handleClick(video.id)}
			disabled={!!choice}
		>
			{video?.name}
		</Button>
	);
};

export default Choices;
