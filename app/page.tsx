"use client";

import NbRoundInput from "@/features/playlist-selection/nb-round-input";
import PlaylistHistory from "@/features/playlist-selection/playlist-history";
import PlaylistInput from "@/features/playlist-selection/playlist-input";
import PlaylistPresets from "@/features/playlist-selection/playlist-presets";
import useResetQuizz from "@/hooks/useResetQuizz";

export default function Home() {
	useResetQuizz();

	return (
		<main
			className="
				grid md:grid-cols-2 
				p-24 sm:p-2 gap-8
			"
		>
			<div className="grid gap-8 justify-self-end">
				<NbRoundInput />
				<PlaylistInput />
			</div>
			<div className="grid gap-8 justify-self-start">
				<PlaylistHistory />
				<PlaylistPresets />
			</div>
		</main>
	);
}
