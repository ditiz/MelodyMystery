import ListItem from "@/components/custom/list-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dataPlaylistPresets from "@/data/playlists.json";
import { PLAYLIST_HISTORY } from "@/lib/constants";
import type { PlaylistPreset } from "@/types/Playlist";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PlaylistPresets = () => {
	const playlistPresets: PlaylistPreset[] = dataPlaylistPresets.slice(0, 4);

	const addToHistory = (playlist: PlaylistPreset) => {
		localStorage.setItem(
			PLAYLIST_HISTORY,
			`${localStorage.getItem(PLAYLIST_HISTORY) ?? ""};${playlist.name}:${playlist.id}`,
		);
	};

	return (
		<Card className="bg-slate-900">
			<CardHeader>
				<h2 className="text-2xl font-bold pb-2">Playlist Presets</h2>
			</CardHeader>

			<CardContent className="flex flex-col gap-6">
				<ul className="grid grid-cols-2 gap-4">
					{playlistPresets.map((playlist) => (
						<ListItem key={playlist.id}>
							<Link
								href={`/quizz/${playlist.id}`}
								className="w-10/12 break-words"
								onClick={() => addToHistory(playlist)}
							>
								{playlist.name}
							</Link>
						</ListItem>
					))}
				</ul>

				<Link href={"/playlist-presets"}>
					<Button className="w-full flex gap-2" variant={"secondary"}>
						Explore more <ArrowRight className="size-4" />
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
};

export default PlaylistPresets;
