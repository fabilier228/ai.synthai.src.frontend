"use client";
import TopSection from "@/app/components/TopSection";
import FeatureSection from "@/app/components/FeatureSection";
import UseCasesSection from "@/app/components/UseCasesSection";
import HowItWorksSection from "@/app/components/HowItWorksSection";
import FQASection from "@/app/components/FQASeaction";



export default function Home() {


 

  return (
    <div className=" w-[90%] md:w-4/5  xl:w-[70%] mx-auto flex flex-col justify-between mt-20 lg:mt-8 ">
     
      <TopSection />
            <FeatureSection />
            <div className="w-full flex flex-col md:flex-row md:items-stretch md:justify-center md:gap-6">
                  <HowItWorksSection />
                  <UseCasesSection />
            </div>
            <FQASection />
    </div>
  );
}
