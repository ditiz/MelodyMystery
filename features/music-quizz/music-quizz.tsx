"use client";

import Loader from "@/components/ui/Loader";
import { playerAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import Score from "./Score";
import Actions from "./actions";
import Choices from "./choices";
import Result from "./result";
import YoutubePlayers from "./youtube-players";

const MusicElement = () => {
  const [player] = useAtom(playerAtom);

  return (
    <article className="flex flex-col items-center gap-6">
      {player ? (
        <>
          <Score />
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
