import React, { useState } from "react";
import {
  HomeFilled,
  Person,
  ExpandMore,
  ExpandLess,
  Description,
  LocalLibrary,
  Storage,
  Summarize,
} from "@mui/icons-material";

interface NavbarProps {
  onNavigate: (
    view: "home" | "profile" | "my-data" | "my-summaries" | "transcript",
    transcriptId?: string
  ) => void;
  activeView: "home" | "profile" | "my-data" | "my-summaries" | "transcript";
  selectedTranscript?: string;
}

const Navbar = ({
  onNavigate,
  activeView,
  selectedTranscript,
}: NavbarProps) => {
  const [isTranscriptsExpanded, setIsTranscriptsExpanded] = useState(false);

  const transcripts = [
    { id: "transcript1", name: "Transcript1" },
    { id: "transcript2", name: "Transcript2" },
    { id: "transcript3", name: "Transcript3" },
    { id: "transcript4", name: "Transcript4" },
    { id: "transcript5", name: "Transcript5" },
    { id: "transcript6", name: "Transcript6" },
  ];
  return (
    <>
      {/* Mobile navbar (bottom, icons) */}
      <nav className="fixed left-0 bottom-0 w-screen bg-surface border-t border-outline py-2 z-[100] flex md:hidden">
        <ul className="flex flex-row justify-between items-center w-full m-0 p-0 list-none">
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => onNavigate("home")}>
              <HomeFilled
                className={`text-[2.2rem] transition-colors duration-200 ${
                  activeView === "home" ? "text-primary" : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => onNavigate("my-data")}>
              <Storage
                className={`text-[2.2rem] transition-colors duration-200 ${
                  activeView === "my-data"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => onNavigate("my-summaries")}>
              <Summarize
                className={`text-[2.2rem] transition-colors duration-200 ${
                  activeView === "my-summaries"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => onNavigate("transcript", transcripts[0].id)}>
              <LocalLibrary
                className={`text-[2.2rem] transition-colors duration-200 ${
                  activeView === "transcript"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => onNavigate("profile")}>
              <Person
                className={`text-[2.2rem] transition-colors duration-200 ${
                  activeView === "profile"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
        </ul>
      </nav>
      {/* Desktop navbar (left, text links) */}
      <nav
        className="hidden md:flex flex-col gap-2 w-64 fixed left-0 z-[102] pt-2 pb-4 px-6 bg-surface"
        style={{ top: "5.5rem" }}
      >
        <button
          onClick={() => onNavigate("home")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${
            activeView === "home"
              ? "text-primary"
              : "text-primary_muted hover:text-primary"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate("my-data")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${
            activeView === "my-data"
              ? "text-primary"
              : "text-primary_muted hover:text-primary"
          }`}
        >
          My data
        </button>

        <button
          onClick={() => onNavigate("my-summaries")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${
            activeView === "my-summaries"
              ? "text-primary"
              : "text-primary_muted hover:text-primary"
          }`}
        >
          My summaries
        </button>

        <button
          onClick={() => onNavigate("profile")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${
            activeView === "profile"
              ? "text-primary"
              : "text-primary_muted hover:text-primary"
          }`}
        >
          Profile
        </button>

        {/* Transcripts Section */}
        <div className="mt-2">
          <button
            onClick={() => setIsTranscriptsExpanded(!isTranscriptsExpanded)}
            className="w-full text-left transition-colors text-btn_sm mb-1 py-2 px-2 text-primary_muted hover:text-primary flex items-center justify-between"
          >
            <span>Transcripts</span>
            {isTranscriptsExpanded ? (
              <ExpandLess className="text-sm" />
            ) : (
              <ExpandMore className="text-sm" />
            )}
          </button>

          {isTranscriptsExpanded && (
            <div className="ml-4 border-l border-outline pl-2">
              {transcripts.map((transcript) => (
                <button
                  key={transcript.id}
                  onClick={() => onNavigate("transcript", transcript.id)}
                  className={`w-full text-left transition-colors text-btn_sm py-1 px-2 flex items-center gap-2 ${
                    activeView === "transcript" &&
                    selectedTranscript === transcript.id
                      ? "text-primary"
                      : "text-primary_muted hover:text-primary"
                  }`}
                >
                  <Description className="text-sm" />
                  {transcript.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
