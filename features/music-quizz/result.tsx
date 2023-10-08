import {
  choiceAtom,
  currentVideoIdAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { Check, X } from "lucide-react";

const Result = ({}) => {
  const [choice] = useAtom(choiceAtom);
  const [currentVideoId] = useAtom(currentVideoIdAtom);
  const [videos] = useAtom(videosAtom);

  if (!choice) return null;

  return (
    <article className="flex flex-col item-center">
      <section className="flex justify-center">
        {choice === currentVideoId ? (
          <Check color="green" size={48} />
        ) : (
          <X color="red" size={48} />
        )}
      </section>
      <section>
        {choice !== currentVideoId ? (
          <div>
            <div>
              <span className="text-muted-foreground">It was :</span>{" "}
              {videos.find((v) => v.id === currentVideoId)?.name}
            </div>
            <div>
              <span className="text-muted-foreground">Your answer :</span>{" "}
              {videos.find((v) => v.id === choice)?.name}
            </div>
          </div>
        ) : null}
      </section>
    </article>
  );
};

export default Result;
