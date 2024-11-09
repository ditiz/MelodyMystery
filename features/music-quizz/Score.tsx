import { currentRoundAtom, nbRoundAtom, scoreAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";

const Score = () => {
	const [score] = useAtom(scoreAtom);
	const [nbRound] = useAtom(nbRoundAtom);
	const [currentRound] = useAtom(currentRoundAtom);

	return (
		<article className="flex gap-6 text-muted-foreground font-semibold lg:text-lg">
			<section className="flex gap-2">
				<span>Score:</span>
				<span>{score}</span>
			</section>
			<section className="flex gap-2">
				<span>Round:</span>
				<span>
					{currentRound} / {nbRound}
				</span>
			</section>
		</article>
	);
};

export default Score;
