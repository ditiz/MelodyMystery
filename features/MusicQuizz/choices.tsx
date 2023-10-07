import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { choiceAtom, videosAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";

const Choices = ({}) => {
  const [, setChoice] = useAtom(choiceAtom);
  const [videos] = useAtom(videosAtom);

  if (videos.length !== 4) return null;
  if (videos.some((v) => !v.name)) return <Loader />;

  return (
    <section className="choice grid gap-6 grid-cols-2">
      <Button
        className="h-auto text-lg p-6 break-words bg-green-400 hover:bg-green-600"
        onClick={() => setChoice(videos[0].id)}
      >
        {videos[0]?.name}
      </Button>
      <Button
        className="h-auto text-lg p-6 bg-orange-400 hover:bg-orange-600"
        onClick={() => setChoice(videos[1].id)}
      >
        {videos[1]?.name}
      </Button>
      <Button
        className="h-auto text-lg p-6 bg-teal-400 hover:bg-teal-600"
        onClick={() => setChoice(videos[2].id)}
      >
        {videos[2]?.name}
      </Button>
      <Button
        className="h-auto text-lg p-6 bg-purple-400 hover:bg-purple-600"
        onClick={() => setChoice(videos[3].id)}
      >
        {videos[3]?.name}
      </Button>
    </section>
  );
};

export default Choices;
