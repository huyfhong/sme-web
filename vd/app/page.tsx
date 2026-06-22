import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Statistics } from "@/components/Statistics";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Products />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
