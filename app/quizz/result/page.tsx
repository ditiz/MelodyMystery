"use client";

import { Button } from "@/components/ui/button";
import { scoreAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import Link from "next/link";

export default function ResultPage() {
  const [score] = useAtom(scoreAtom);

  return (
    <>
      <main className="flex min-h-screen flex-col gap-6 items-center p-2 lg:p-24">
        <div className="text-lg">Your score is {score}</div>
        <div>
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
