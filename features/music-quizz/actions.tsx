"use client";

import { Button } from "@/components/ui/button";
import {
  choiceAtom,
  currentVideoIdAtom,
  playerAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";

interface ActionsProps {}

const Actions = ({}: ActionsProps) => {
  const [player] = useAtom(playerAtom);
  const [choice, setChoice] = useAtom(choiceAtom);
  const [currentVideoId, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const [, setVideos] = useAtom(videosAtom);

  const start = () => {
    player?.playVideo();
    setCurrentVideoId(player?.getVideoData()?.video_id ?? null);
  };

  const next = () => {
    player?.nextVideo();
    setCurrentVideoId(player?.getVideoData().video_id ?? null);
    setChoice(null);
    setVideos([]);
  };

  return (
    <div className="flex gap-6 ">
      {!currentVideoId ? <Button onClick={start}>Start</Button> : null}
      {choice ? <Button onClick={next}>Next</Button> : null}
    </div>
  );
};

export default Actions;
