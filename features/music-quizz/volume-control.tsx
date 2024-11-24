"use client";

import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { playerAtom } from "@/state/music-quizz";
import { Popover } from "@radix-ui/react-popover";
import { useAtom } from "jotai";
import { Volume1, Volume2 } from "lucide-react";
import { useState } from "react";

const VolumeControl = () => {
	const [player] = useAtom(playerAtom);

	const [volume, setVolume] = useState(50);

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0];
		setVolume(newVolume);
		player?.setVolume(newVolume);
	};

	return (
		<article className="flex gap-3">
			<Popover>
				<PopoverTrigger>
					<Button variant={"ghost"} className="text-muted-foreground">
						{volume > 50 ? <Volume2 /> : <Volume1 />}
					</Button>
				</PopoverTrigger>

				<PopoverContent>
					<Slider
						defaultValue={[volume]}
						max={100}
						min={1}
						onValueChange={handleVolumeChange}
					/>

					<span>{volume}</span>
				</PopoverContent>
			</Popover>
		</article>
	);
};

export default VolumeControl;
