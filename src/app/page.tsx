import { Footer } from "~/components/elements/footer";
import { Navbar } from "~/components/elements/navbar";
import Homepage from "~/features/pages/homepage";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="min-h-screen w-full">
        <Homepage />
      </main>
      <Footer />
    </div>
  );
}
