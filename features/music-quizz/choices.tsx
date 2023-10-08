import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
  choiceAtom,
  currentVideoIdAtom,
  scoreAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";

const buttonsClassName = "h-auto lg:text-lg lg:p-6 break-words";

const buttonsColors = [
  "bg-green-400 hover:bg-green-600",
  "bg-orange-400 hover:bg-orange-600",
  "bg-teal-400 hover:bg-teal-600",
  "bg-purple-400 hover:bg-purple-600",
];

const Choices = ({}) => {
  const [choice, setChoice] = useAtom(choiceAtom);
  const [videos] = useAtom(videosAtom);
  const [currentVideoId] = useAtom(currentVideoIdAtom);
  const [, setScore] = useAtom(scoreAtom);

  if (videos.length !== 4) return null;
  if (videos.some((v) => !v.name)) return <Loader />;

  const handleClick = (videoId: string) => {
    setChoice(videoId);
    if (videoId === currentVideoId) {
      setScore((s) => s + 100);
    }
  };

  return (
    <section className="choice grid gap-6 grid-cols-1 lg:grid-cols-2 w-auto max-w-[90vh]">
      {videos.map((v, i) => (
        <Button
          key={v.id}
          className={`${buttonsClassName} ${buttonsColors[i]}`}
          onClick={() => handleClick(v.id)}
          disabled={!!choice}
        >
          {v?.name}
        </Button>
      ))}
    </section>
  );
};

export default Choices;
