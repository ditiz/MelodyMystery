"use client";

import ErrorMessages from "@/features/playlist-selection/errors-message";
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
				h-full
				justify-items-center
			"
		>
			<div className="flex flex-col gap-8 md:justify-self-end">
				<ErrorMessages />
				<NbRoundInput />
				<PlaylistInput />
			</div>
			<div className="flex flex-col gap-8 md:justify-self-start">
				<PlaylistHistory />
				<PlaylistPresets />
			</div>
		</main>
	);
}
