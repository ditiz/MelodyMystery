import dataPlaylistPresets from "@/data/playlists.json";
import PlaylistPresetItem from "@/features/playlist-presets/playlist-preset-item";
import { getGradient } from "@/lib/utils";
import type { PlaylistPreset } from "@/types/Playlist";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PlaylistPresets() {
	const playlistPresetsItems: PlaylistPreset[] = dataPlaylistPresets;

	return (
		<article className="mx-4 md:mx-24 grid gap-6">
			<section className="flex gap-2 items-center">
				<Link href="/" className="flex gap-2">
					<ArrowLeft className="size-6 mb-2" />
				</Link>
				<h2 className="text-2xl font-bold pb-2">Playlist Presets</h2>
			</section>
			<section className="grid md:grid-cols-3 gap-4">
				{playlistPresetsItems.map((playlist, index) => (
					<PlaylistPresetItem
						key={playlist.id}
						playlist={playlist}
						borderColor={getGradient(index)}
					/>
				))}
			</section>
		</article>
	);
}
