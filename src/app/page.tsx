"use client";
import { useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToogle";
import Footer from "@/app/components/Footer";

import TopSection from "@/app/components/TopSection";
import FeatureSection from "@/app/components/FeatureSection";
import UseCasesSection from "@/app/components/UseCasesSection";
import HowItWorksSection from "@/app/components/HowItWorksSection";
import FQASection from "@/app/components/FQASeaction";



export default function Home() {


 

  return (
    <div className="min-h-screen md:w-4/5 mx-auto flex flex-col justify-between mt-20 md:mt-8">
     
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
    </div>
  );
}
