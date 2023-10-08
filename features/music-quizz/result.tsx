import { choiceAtom, currentVideoIdAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { Check, X } from "lucide-react";

const Result = ({}) => {
  const [choice] = useAtom(choiceAtom);
  const [currentVideoId] = useAtom(currentVideoIdAtom);

  if (!choice) return null;

  return (
    <section className="result">
      {choice === currentVideoId ? (
        <Check color="green" size={48} />
      ) : (
        <X color="red" size={48} />
      )}
    </section>
  );
};

export default Result;
