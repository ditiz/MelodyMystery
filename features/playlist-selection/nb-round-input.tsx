import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { errorsAtom, nbRoundAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { isNumber } from "lodash";

const NbRoundInput = () => {
	const [, setErrors] = useAtom(errorsAtom);
	const [nbRound, setNbRound] = useAtom(nbRoundAtom);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		if (!isNumber(value) || value < 0 || Number.isNaN(value)) {
			setErrors((e) => [
				...e,
				{ type: "destructive", message: "Number of round invalid" },
			]);
			return;
		}
		setNbRound(value);
	};

	return (
		<Card className="bg-slate-900">
			<CardHeader>
				<label htmlFor="nb-round" className="text-2xl font-bold pb-2">
					Number of round
				</label>
			</CardHeader>
			<CardContent className="flex gap-4 justify-center">
				<Input
					id="nb-round"
					type="number"
					className="w-24"
					value={nbRound}
					onChange={handleChange}
				/>
			</CardContent>
		</Card>
	);
};

export default NbRoundInput;
