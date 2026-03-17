import { ClientSidebar } from "~/components/elements/client-sidebar";
import { SidebarProvider} from "~/components/ui/sidebar";
import Homepage from "~/features/pages/homepage";

export default function Home() {
	return (
		<div className="font-sans">
			<SidebarProvider>
				<ClientSidebar />
				<main className="bg-red-100 min-h-screen w-full p-4">
          <Homepage />
				</main>
			</SidebarProvider>
		</div>
	);
}
