"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, Sparkles, Shield, Globe, Check, Zap } from "lucide-react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DescriptionIcon from "@mui/icons-material/Description";

export default function AudioAnalyzerFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // slower auto-advance for smoother mobile UX
    const interval = setInterval(() => setActiveStep((p) => (p + 1) % 4), 5000);
    return () => clearInterval(interval);
  }, []);

  const audioTypes = [
    {
      id: "song",
      title: "Song",
      icon: MusicNoteIcon,
      color: "var(--primary)",
      bgColor: "var(--primary_muted)",
      results: ["Title & Artist", "Emotions & Themes", "Interpretation"],
    },
    {
      id: "conversation",
      title: "Conversation",
      icon: ChatBubbleOutlineIcon,
      color: "var(--secondary)",
      bgColor: "var(--secondary)",
      results: ["Participants", "Tone of conversation", "Key quotes"],
    },
    {
      id: "lecture",
      title: "Lecture",
      icon: SchoolIcon,
      color: "var(--success)",
      bgColor: "var(--success)",
      results: ["Key concepts", "Structure", "Main thesis"],
    },
    {
      id: "audiobook",
      title: "Audiobook",
      icon: MenuBookIcon,
      color: "var(--warning)",
      bgColor: "var(--warning)",
      results: ["Summary", "Characters", "Literary motifs"],
    },
  ];

  const mainSteps = [
    {
      number: "1",
      title: "Select audio type",
      icon: CloudUploadIcon,
      description: "User selects a category: song, conversation, lecture, or audiobook",
      color: "var(--primary)",
    },
    {
      number: "2",
      title: "Upload & Transcription",
      icon: RecordVoiceOverIcon,
      description: "File upload + synchronous music recognition (Shazam-like) and multilingual transcription",
      color: "var(--secondary)",
    },
    {
      number: "3",
      title: "AI Analysis",
      icon: PsychologyIcon,
      description: "LLM analysis (GPT-4 / GPT-4.1) producing structured JSON according to category schema",
      color: "var(--tertiary)",
    },
    {
      number: "4",
      title: "Summary",
      icon: DescriptionIcon,
      description: "Final JSON report; for songs we compare/verify with music recognition results",
      color: "var(--success)",
    },
  ];



  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 mt-20 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[var(--primary)]" />
            <h1 className="text-h2 font-styled text-[var(--text)]">How it works?</h1>
          </div>
          <p className="text-[var(--muted)] text-xl max-w-3xl mx-auto leading-relaxed">
            Our application uses state-of-the-art AI models for automatic transcription and deep analysis of
            various audio types.
          </p>
        </div>

      

        {/* Main Flow Diagram */}
        <div className="mb-20">
          <h2 className="text-h3 font-styled text-center text-[var(--text)] mb-12">Audio analysis process</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {mainSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div key={idx}>
                  <div
                    className={`relative bg-[var(--surface)] rounded-2xl p-6 md:p-8 shadow-sm md:shadow-lg border-2 transition-all duration-500 ${
                      isActive ? "border-[var(--primary)] md:shadow-2xl md:scale-105" : "border-[var(--outline)]"
                    }`}
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div
                        className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg ${
                          isActive ? "md:animate-pulse" : ""
                        }`}
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </div>

                      <div
                        className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform ${
                          isActive ? "md:scale-110" : ""
                        }`}
                        style={{ backgroundColor: step.color, color: "white" }}
                      >
                        <StepIcon sx={{ fontSize: 20 }} style={{ color: "white" }} />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg md:text-2xl font-bold text-[var(--text)] mb-2">{step.title}</h3>
                        <p className="text-[var(--muted)] leading-relaxed">{step.description}</p>
                      </div>

                      {isActive && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-[var(--primary)] rounded-full md:animate-ping opacity-75"></div>
                          <div className="w-6 h-6 bg-[var(--primary)] rounded-full absolute top-0"></div>
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <div className="mt-4 md:mt-6 h-1 md:h-2 bg-[var(--outline)] rounded-full overflow-hidden">
                        <div className="h-full animate-[progress_5s_linear]" style={{ width: "100%", backgroundColor: step.color }} />
                      </div>
                    )}
                  </div>

                  {idx < mainSteps.length - 1 && (
                    <div className="flex justify-center py-3 md:py-4">
                      <ArrowDown className={`w-8 h-8 transition-colors ${isActive ? "md:animate-bounce" : ""}`} style={{ color: isActive ? step.color : "var(--outline)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Types Section */}
        <div className="mb-20">
          <h2 className="text-h3 font-styled text-center text-[var(--text)] mb-4">Supported audio types</h2>
          <p className="text-center text-[var(--muted)] mb-12 text-lg">Each audio type receives a tailored analysis</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {audioTypes.map((type, idx) => {
              const TypeIcon = type.icon;
              return (
                <div key={type.id} className="bg-[var(--surface)] rounded-2xl p-6 border-2 border-[var(--outline)] hover:border-[var(--primary)] transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: type.color }}>
                    <TypeIcon sx={{ fontSize: 32, color: "white" }} />
                  </div>
                  <h3 className="text-h5 font-heading text-[var(--text)] text-center mb-4">{type.title}</h3>
                  <div className="space-y-2">
                    {type.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: type.color }} />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      
        {/* Technology Section */}
        <div className="mb-20 bg-[var(--surface)] border border-[var(--outline)] rounded-3xl p-12">
          <h2 className="text-h3 font-styled text-center text-[var(--text)] mb-4">Technology</h2>
          <p className="text-center text-[var(--muted)] mb-12 text-lg">We use top AI tools in the industry</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Azure AI", desc: "Multilingual transcription", color: "var(--primary)" },
              { icon: Sparkles, title: "GPT-4", desc: "Advanced analysis", color: "var(--secondary)" },
              { icon: Globe, title: "Shazam API", desc: "Music recognition", color: "var(--success)" },
              { icon: Zap, title: "Custom algorithms", desc: "Results optimization", color: "var(--warning)" },
            ].map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div key={idx} className="bg-[var(--background)] rounded-xl p-6 text-center hover:scale-105 transition-all group border-2 border-[var(--outline)]">
                  <TechIcon className="w-10 h-10 mx-auto mb-3 transition-colors" style={{ color: tech.color }} />
                  <h4 className="font-heading text-h5 mb-2 text-[var(--text)]">{tech.title}</h4>
                  <p className="text-sm text-[var(--muted)]">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary via-tertiary to-secondary rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-h3 font-bold mb-4">Ready to try?</h2>
            <p className="text-h4 mb-8 opacity-90">Start analyzing your audio now!</p>
              <button className="px-10 py-4 bg-white text-[var(--primary)] rounded-xl  text-btn_b_sm lg:text-btn_b_md hover:shadow-2xl hover:scale-105 transition-all">Get started</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
