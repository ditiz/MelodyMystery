"use client";

import { Button } from "@/components/ui/button";
import { playlistHistory } from "@/lib/constants";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const getHistory = () => {
  if (typeof window === "undefined") return [];

  return (
    (localStorage.getItem(playlistHistory) ?? "")
      .split(";")
      // remove empty string and duplicates
      .filter((e, i, a) => e && a.indexOf(e) === i)
  );
};

const PlaylistHistory = () => {
  const [playlists, setPlaylists] = useState<string[]>([]);

  useEffect(() => {
    setPlaylists(getHistory());
  }, []);

  if (!playlists.length) {
    return null;
  }

  return (
    <article className="w-80">
      <h2 className="text-2xl font-bold pb-2">History</h2>

      <ul className="flex flex-col gap-4">
        {playlists.map((playlistId) => (
          <li
            key={playlistId}
            className="flex items-center justify-between relative transition-all rounded outline outline-offset-2 outline-gray-800 hover:outline-gray-600 px-2"
          >
            <Link href={`/quizz/${playlistId}`} className="w-10/12 break-words">
              {playlistId}
            </Link>
            <Button
              variant={"ghost"}
              size={"icon"}
              className=""
              onClick={() => {
                const newPlaylists = playlists.filter((p) => p !== playlistId);
                localStorage.setItem(playlistHistory, newPlaylists.join(";"));
                setPlaylists(newPlaylists);
              }}
            >
              {<X />}
            </Button>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PlaylistHistory;
