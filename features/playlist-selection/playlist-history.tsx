"use client";

import { playlistHistory } from "@/lib/constants";
import Link from "next/link";

const PlaylistHistory = () => {
  const playlists = (localStorage.getItem(playlistHistory) ?? "")
    .split(";")
    // remove empty string and duplicates
    .filter((e, i, a) => e && a.indexOf(e) === i);

  return (
    <article>
      <h2 className="text-2xl font-bold pb-2">History</h2>

      <ul className="flex flex-col gap-4">
        {playlists.map((playlistId) => (
          <li key={playlistId} className="flex items-center">
            <Link
              href={`/quizz/${playlistId}`}
              className="transition-all rounded outline outline-offset-2 outline-gray-800 hover:outline-gray-600 px-2 w-80 break-words"
            >
              {playlistId}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PlaylistHistory;
