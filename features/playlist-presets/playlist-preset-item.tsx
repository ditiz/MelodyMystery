import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PlaylistPreset } from "@/types/Playlist";
import Link from "next/link";

const PlaylistPresetItem = ({
	playlist,
	borderColor,
}: { playlist: PlaylistPreset; borderColor: string }) => {
	return (
		<Link
			href={`/quizz/${playlist.id}`}
			className={`h-full ${playlist.size ? "row-span-2" : ""}`}
		>
			<article
				className={`h-full bg-gradient-to-br ${borderColor} p-1 rounded-lg`}
			>
				<Card key={playlist.id} className="h-full bg-slate-900">
					<CardHeader>
						<h3 className="text-xl font-bold">{playlist.name}</h3>
					</CardHeader>
					<CardContent>
						<div className="m-2">{playlist.description}</div>
					</CardContent>
				</Card>
			</article>
		</Link>
	);
};

export default PlaylistPresetItem;
