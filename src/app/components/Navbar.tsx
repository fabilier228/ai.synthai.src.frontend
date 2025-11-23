"use client";
import React from "react";
import {
  HomeFilled,
  ModelTraining,
  AddCircleOutline,
  LocalLibrary,
  Person,
  Description,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isTranscriptsExpanded, setIsTranscriptsExpanded] = useState(false);
  const [activePath, setActivePath] = React.useState(pathname);

  const [transcripts, setTranscripts] = React.useState<
    { id: string; name: string }[]
  >([]);
  const keycloakId = "demo-user";

  React.useEffect(() => {
    const fetchTranscripts = () => {
      fetch(`http://localhost:8083/api/v1/transcriptions/user/${keycloakId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.transcriptions) {
            setTranscripts(
              data.transcriptions.map(
                (t: { id: string | number; title?: string }) => ({
                  id: t.id?.toString(),
                  name: t.title || `Transcript ${t.id}`,
                })
              )
            );
          }
        });
    };
    fetchTranscripts();
    const interval = setInterval(fetchTranscripts, 5000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setActivePath(pathname);
    const isTranscriptPath = pathname?.startsWith("/transcripts/");
    if (isTranscriptPath) {
      setIsTranscriptsExpanded(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Navbar  */}
      <nav className="fixed left-0 bottom-0 w-screen bg-surface border-t border-outline py-2 z-[100] flex lg:hidden">
        <ul className="flex flex-row justify-between items-center w-full m-0 p-0 list-none">
          <li
            className={`flex-1 flex justify-center items-center ${
              activePath === "/" ? "text-primary" : "text-primary_muted"
            }`}
          >
            <button onClick={() => router.push("/")}>
              <HomeFilled
                fontSize="large"
                className={` transition-colors duration-200 ${
                  activePath === "/" ? "text-primary" : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li
            className={`flex-1 flex justify-center items-center ${
              activePath === "/models" ? "text-primary" : "text-primary_muted"
            }`}
          >
            <button onClick={() => router.push("/models")}>
              <ModelTraining
                fontSize="large"
                className={`transition-colors duration-200 ${
                  activePath === "/models"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li
            className={`flex-1 flex justify-center items-center ${
              activePath === "/add_new" ? "text-primary" : "text-primary_muted"
            }`}
          >
            <button onClick={() => router.push("/add_new")}>
              <AddCircleOutline
                fontSize="large"
                className={`transition-colors duration-200 ${
                  activePath === "/add_new"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
          <li
            className={`flex-1 flex justify-center items-center ${
              activePath?.startsWith("/transcripts")
                ? "text-primary"
                : "text-primary_muted"
            }`}
          >
            <button onClick={() => router.push("/transcripts")}>
              <LocalLibrary
                fontSize="large"
                className={`transition-colors duration-200 ${
                  activePath?.startsWith("/transcripts")
                    ? "text-primary"
                    : "text-primary_muted hover:text-primary"
                }`}
              />
            </button>
          </li>
          <li
            className={`flex-1 flex justify-center items-center ${
              activePath === "/profile" ? "text-primary" : "text-primary_muted"
            }`}
          >
            <button onClick={() => router.push("/profile")}>
              <Person
                fontSize="large"
                className={`transition-colors duration-200 ${
                  activePath === "/profile"
                    ? "text-primary"
                    : "text-primary_muted"
                }`}
              />
            </button>
          </li>
        </ul>
      </nav>

      {/* Desktop Navbar  */}
      <nav className="hidden lg:flex flex-col gap-2 w-64 fixed left-0 z-[102] top-1/3 transform -translate-y-1/3 py-4 px-6 bg-surface">
        <span className="block text-primary text-styled_md  tracking-wide text-left leading-tight font-styled mb-4 ">
          Synthai
        </span>
        <button
          onClick={() => router.push("/")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 hover:text-primary ${
            activePath === "/" ? "text-primary" : "text-primary_muted"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => router.push("/models")}
          className={`text-left transition-colors text-btn_sm py-2 px-2 hover:text-primary ${
            activePath === "/models" ? "text-primary" : "text-primary_muted"
          }`}
        >
          Our models
        </button>

        <button
          onClick={() => router.push("/add_new")}
          className={`text-left transition-colors text-btn_sm py-2 px-2 hover:text-primary ${
            activePath === "/add_new" ? "text-primary" : "text-primary_muted"
          }`}
        >
          Add new
        </button>
        <button
          onClick={() => router.push("/profile")}
          className={`text-left transition-colors text-btn_sm py-2 px-2 hover:text-primary ${
            activePath === "/profile" ? "text-primary" : "text-primary_muted"
          }`}
        >
          Profile
        </button>
        <div>
          <div
            className={`flex  ${
              activePath?.startsWith("/transcripts")
                ? "text-primary"
                : "text-primary_muted hover:text-primary"
            }`}
          >
            <button
              onClick={() => router.push("/transcripts")}
              className={`w-full text-left transition-colors text-btn_sm mb-1 py-2 px-2  hover:text-primary flex items-center justify-between `}
            >
              Transcripts
            </button>
            <button
              onClick={() => setIsTranscriptsExpanded(!isTranscriptsExpanded)}
            >
              {isTranscriptsExpanded ? (
                <ExpandLess className="text-sm text-primary_muted" />
              ) : (
                <ExpandMore className="text-sm text-primary_muted" />
              )}
            </button>
          </div>

          {isTranscriptsExpanded && (
            <div className="ml-4 border-l border-outline pl-2 max-h-64 overflow-y-auto">
              {transcripts.map((transcript) => {
                const transcriptPath = `/transcripts/${transcript.id}`;
                const isActive = activePath === transcriptPath;
                return (
                  <button
                    key={transcript.id}
                    onClick={() => router.push(transcriptPath)}
                    className={`w-full text-left transition-colors text-btn_sm py-1 px-2 flex items-center gap-2 ${
                      isActive
                        ? "text-primary"
                        : "text-primary_muted hover:text-primary"
                    }`}
                  >
                    <Description className="text-sm" />
                    {transcript.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
