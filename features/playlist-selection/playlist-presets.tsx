import ListItem from "@/components/custom/list-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import dataPlaylistPresets from "@/data/playlists.json";
import type { PlaylistPreset } from "@/types/Playlist";
import Link from "next/link";

const PlaylistPresets = () => {
	const playlistPresets: PlaylistPreset[] = dataPlaylistPresets;

	return (
		<Card className="w-80 bg-muted/50">
			<CardHeader>
				<h2 className="text-2xl font-bold pb-2">Playlist Presets</h2>
			</CardHeader>
			<CardContent>
				<ul className="grid grid-cols-2 gap-4">
					{playlistPresets.map((playlist) => (
						<ListItem key={playlist.id}>
							<Link
								href={`/quizz/${playlist.id}`}
								className="w-10/12 break-words"
							>
								{playlist.name}
							</Link>
						</ListItem>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default PlaylistPresets;
