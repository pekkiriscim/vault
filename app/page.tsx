import FAQ from "@/components/faq";
import Banner from "@/components/banner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="mx-6 max-sm:mx-3">
        <div className="flex flex-col max-w-5xl mx-auto">
          <Header />
          <Features />
          <HowItWorks />
          <FAQ />
          <Footer />
        </div>
      </div>
    </main>
  );
}
