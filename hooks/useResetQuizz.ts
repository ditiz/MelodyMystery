import {
  choiceAtom,
  currentVideoIdAtom,
  errorsAtom,
  playerAtom,
  videosAtom,
} from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useResetQuizz() {
  const [, setPlayer] = useAtom(playerAtom);
  const [, setVideos] = useAtom(videosAtom);
  const [, setCurrentVideoId] = useAtom(currentVideoIdAtom);
  const [, setError] = useAtom(errorsAtom);
  const [, setChoice] = useAtom(choiceAtom);

  useEffect(() => {
    setPlayer(null);
    setVideos([]);
    setCurrentVideoId(null);
    setError([]);
    setChoice(null);
  }, [setChoice, setCurrentVideoId, setError, setPlayer, setVideos]);
}
