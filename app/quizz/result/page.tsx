"use client";

import { Button } from "@/components/ui/button";
import { scoreAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function ResultPage() {
	const [score, setScore] = useAtom(scoreAtom);

	const router = useRouter();

	const handleBackToHome = () => {
		setScore(0);
		router.push("/");
	};

	return (
		<>
			<main className="flex min-h-screen flex-col gap-6 items-center p-2 lg:p-24">
				<div className="text-lg">Your score is {score}</div>
				<div>
					<Button onClick={handleBackToHome}>Back to home</Button>
				</div>
			</main>
		</>
	);
}
