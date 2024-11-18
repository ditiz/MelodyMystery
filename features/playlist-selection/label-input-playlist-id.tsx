import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

const LabelInputPlaylistId = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<label htmlFor="playlist-id" className="flex mb-2 gap-2">
						Playlist id
						<CircleHelp />
					</label>
				</TooltipTrigger>
				<TooltipContent>
					<h2>How to Get a YouTube Playlist ID</h2>
					<p>1. Open the playlist on YouTube.</p>
					<p>
						2. Look at the URL, e.g.,
						<code>
							https://www.youtube.com/playlist?list=PLG7EWwhWrY25Q7RiWjWB20aiyPszZMlk5
						</code>
					</p>
					<p>
						3. The ID is the part after <code>list=</code>, here:{" "}
						<strong>PLG7EWwhWrY25Q7RiWjWB20aiyPszZMlk5</strong>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default LabelInputPlaylistId;
