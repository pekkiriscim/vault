import Header from "@/components/header";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <main className="flex flex-col max-w-5xl mx-auto">
      <Header />
      <Features />
      <HowItWorks />
    </main>
  );
}
