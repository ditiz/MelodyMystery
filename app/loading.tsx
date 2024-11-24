import Loader from "@/components/ui/Loader";

export default function Loading() {
	return (
		<section className="w-screen h-[50vh] grid place-items-center">
			<Loader className="h-16 w-16" />
		</section>
	);
}
