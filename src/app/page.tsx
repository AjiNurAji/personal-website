import { Navbar } from "~/components/elements/navbar";
import Homepage from "~/features/pages/homepage";

export default function Home() {
	return (
		<div className="font-sans">
			<Navbar />
			<main className="min-h-screen w-full lg: max-w-5xl mx-auto flex flex-col items-center justify-center">
				<Homepage />
			</main>
		</div>
	);
}
