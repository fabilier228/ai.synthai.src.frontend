"use client";
import { ThemeToggle } from "@/components/ThemeToogle";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopSection from "@/components/TopSection";
import FeatureSection from "@/components/FeatureSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FQASection from "@/components/FQASeaction";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mx-[5%] lg:mx-[10%] xl:mx-[15%]">
        <TopSection />
        <FeatureSection />
        <div className="w-full flex flex-col md:flex-row md:items-stretch md:justify-center px-4 my-12">
          <div className="w-full flex flex-col md:flex-row md:gap-2">
            <div className="w-full md:w-1/2 flex">
              <HowItWorksSection />
            </div>
            <div className="w-full md:w-1/2 flex mt-8 md:mt-0">
              <UseCasesSection />
            </div>
          </div>
        </div>
        <FQASection />
        {/* <ThemeToggle /> */}
      </div>
      <Footer />
      <Navbar />
    </div>
  );
}
