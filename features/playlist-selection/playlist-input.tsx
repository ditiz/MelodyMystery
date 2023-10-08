"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessages from "./Alert";

function cleanYoutubeVideoUrl(url: string) {
  const startIndex = url.indexOf("list=");

  if (startIndex === -1) return url;

  const endIndex = url.indexOf("&", startIndex);

  return url.substring(startIndex + 5, endIndex);
}

const PlaylistInput = () => {
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleStart = () => {
    let playlistId = input.trim();

    // clean url
    if (playlistId.includes("https://www.youtube.com/playlist")) {
      playlistId = playlistId.replace(
        "https://www.youtube.com/playlist?list=",
        ""
      );
    } else if (playlistId.startsWith("https://www.youtube.com/watch")) {
      console.log(cleanYoutubeVideoUrl(playlistId));
      playlistId = cleanYoutubeVideoUrl(playlistId)! ?? playlistId;
    }

    if (!playlistId) return;

    router.push(`/quizz/${playlistId}`);
  };

  return (
    <section className="grid gap-6">
      <ErrorMessages />

      <span>
        Exemple: <span>PL3QJxphXG1iCzpP9KcZU8EG5Z8O3HNb6X</span>
      </span>

      <Input onChange={(e) => setInput(e.target.value)} />

      <Button onClick={handleStart}>Start the game</Button>
    </section>
  );
};

export default PlaylistInput;