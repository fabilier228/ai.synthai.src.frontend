"use client";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToogle";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopSection from "@/components/TopSection";
import FeatureSection from "@/components/FeatureSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FQASection from "@/components/FQASeaction";
import Profile from "@/components/ProfilePage/Profile";
import TranscriptView from "@/components/Transcripts/TranscriptView";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "home" | "profile" | "my-data" | "my-summaries" | "transcript"
  >("home");
  const [selectedTranscript, setSelectedTranscript] = useState<
    string | undefined
  >(undefined);

  const handleNavigate = (
    view: "home" | "profile" | "my-data" | "my-summaries" | "transcript",
    transcriptId?: string
  ) => {
    setActiveView(view);
    if (view === "transcript" && transcriptId) {
      setSelectedTranscript(transcriptId);
    }
  };

  const handleTranscriptChange = (transcriptId: string) => {
    setSelectedTranscript(transcriptId);
  };

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <Profile />;
      case "transcript":
        return (
          <TranscriptView
            transcriptId={selectedTranscript}
            onTranscriptChange={handleTranscriptChange}
          />
        );
      case "home":
      default:
        return (
          <>
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
            <div className="flex-1 h-full w-full flex flex-col items-center justify-center gap-y-6 p-8">
              <div className="bg-surface p-6 rounded-lg border border-outline shadow-lg">
                <ThemeToggle />
              </div>
              <h1 className="text-primary text-4xl font-bold"> Synthai App</h1>
              <div className="flex gap-4 flex-wrap justify-center">
                <div className="bg-primary text-white px-4 py-2 rounded">
                  Primary
                </div>
                <div className="bg-secondary text-white px-4 py-2 rounded">
                  Secondary
                </div>
                <div className="bg-success text-white px-4 py-2 rounded">
                  Success
                </div>
                <div className="bg-warning text-white px-4 py-2 rounded">
                  Warning
                </div>
                <div className="bg-error text-white px-4 py-2 rounded">
                  Error
                </div>
              </div>
              <p className="text-muted text-center max-w-md">Muted</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mx-[5%] lg:mx-[10%] xl:mx-[15%] md:mx-[5%] lg:md:mx-[10%] xl:md:mx-[15%]">
        {renderContent()}
      </div>
      <Footer />
      <Navbar
        onNavigate={handleNavigate}
        activeView={activeView}
        selectedTranscript={selectedTranscript}
      />
    </div>
  );
}
