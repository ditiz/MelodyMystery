import { scoreAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";

const Score = () => {
  const [score] = useAtom(scoreAtom);

  return (
    <div className="flex text-muted-foreground gap-2 font-semibold lg:text-lg">
      <span>Score:</span>
      <span>{score}</span>
    </div>
  );
};

export default Score;
