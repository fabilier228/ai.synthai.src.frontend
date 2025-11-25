"use client";
import React, { useState, useEffect } from "react";
import {
  Description,
  CalendarToday,
  AutoAwesome,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function TranscriptViewContent() {
  const router = useRouter();
  const { user } = useAuth();

  const getWordCount = () => {
    if (currentTranscript?.wordCount && currentTranscript.wordCount > 0) {
      return currentTranscript.wordCount;
    }
    if (currentTranscript?.transcription) {
      return currentTranscript.transcription
        .replace(/Speaker \d+:\s*/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    }
    return 0;
  };
  const [showSummary, setShowSummary] = useState(false);
  const params = useParams();
  const transcriptId = params?.id;
  const [isTranscriptSelectorOpen, setIsTranscriptSelectorOpen] =
    useState(false);
  type TranscriptDetails = {
    id?: string;
    title?: string;
    date?: string;
    time?: string;
    category?: string;
    summary?: Record<string, unknown> | null;
    wordCount?: number;
    transcription?: string;
    createdAt?: string;
  };
  type TranscriptListItem = { id: string; name: string };
  const [currentTranscript, setCurrentTranscript] =
    useState<TranscriptDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptListItem[]>([]);

  useEffect(() => {
    if (!user?.sub) return;
    
    fetch(`http://localhost:8081/transcriptions/user/${user.sub}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.transcriptions) {
          setTranscripts(
            data.transcriptions.map((t: TranscriptDetails) => ({
              id: t.id?.toString(),
              name: t.title || `Transcript ${t.id}`,
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Failed to fetch transcripts list:", err);
      });
  }, [user]);

  // Fetch transcript details
  useEffect(() => {
    if (!transcriptId) return;
    setLoading(true);
    fetch(`http://localhost:8081/transcriptions/${transcriptId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.transcription) {
          type SummaryObj = {
            interpretation?: string;
            [key: string]: unknown;
          };
          let summaryObj: SummaryObj = {};
          if (typeof data.transcription.summary === "string") {
            try {
              summaryObj = JSON.parse(data.transcription.summary);
            } catch {
              summaryObj = {};
            }
          }
          setCurrentTranscript({
            ...data.transcription,
            category: data.transcription.category,
            transcription: data.transcription.transcript,
            summary: summaryObj,
          });
        } else {
          setCurrentTranscript(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch transcript details.");
        setLoading(false);
      });
  }, [transcriptId]);

  const handleDownloadSummary = () => {
    if (!currentTranscript?.id) return;
    fetch(
      `http://localhost:8081/transcriptions/${currentTranscript.id}/download`
    )
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${currentTranscript.title || "transcript"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  // Render different summary layouts depending on category
  const renderSummary = (t: TranscriptDetails | null) => {
    if (!t || !t.summary) return <div>No summary available.</div>;

  const s = t.summary as Record<string, unknown>;
  const cat = (t.category || '').toUpperCase();
  const maybe = (k: string) => Array.isArray(s[k]) ? (s[k] as string[]).join(', ') : undefined;
  const val = (k: string) => (s[k] as string) || undefined;

    switch (cat) {
      case 'SONG':
        return (
          <div>
            <p><strong>Title:</strong> {val('title') || t.title}</p>
            <p><strong>Artist:</strong> {val('artist') || 'Unknown'}</p>
            <p><strong>Genre:</strong> {val('genre') || '—'}</p>
            {maybe('themes') && <p><strong>Themes:</strong> {maybe('themes')}</p>}
            {val('interpretation') && <p><strong>Interpretation:</strong> {val('interpretation')}</p>}
            {maybe('emotions') && <p><strong>Emotions:</strong> {maybe('emotions')}</p>}
          </div>
        );

      case 'LECTURE':
        return (
          <div>
            <p><strong>Title:</strong> {val('title') || t.title}</p>
            <p><strong>Speaker:</strong> {val('speaker') || 'Unknown'}</p>
            {val('fieldOfStudy') && <p><strong>Field:</strong> {val('fieldOfStudy')}</p>}
            {maybe('topics') && <p><strong>Topics:</strong> {maybe('topics')}</p>}
            {val('summary') && <p><strong>Summary:</strong> {val('summary')}</p>}
            {maybe('keyQuotes') && <p><strong>Key quotes:</strong> {maybe('keyQuotes')?.replace(/, /g, ' • ')}</p>}
            {val('conclusion') && <p><strong>Conclusion:</strong> {val('conclusion')}</p>}
          </div>
        );

      case 'AUDIOBOOK':
        return (
          <div>
            <p><strong>Title:</strong> {val('title') || t.title}</p>
            <p><strong>Author:</strong> {val('author') || 'Unknown'}</p>
            <p><strong>Narrator:</strong> {val('narrator') || 'Unknown'}</p>
            {val('plotSummary') && <p><strong>Plot summary:</strong> {val('plotSummary')}</p>}
            {maybe('mainCharacters') && <p><strong>Main characters:</strong> {maybe('mainCharacters')}</p>}
            {maybe('themes') && <p><strong>Themes:</strong> {maybe('themes')}</p>}
          </div>
        );

      case 'CONVERSATION':
        return (
          <div>
            {maybe('participants') && <p><strong>Participants:</strong> {maybe('participants')}</p>}
            {maybe('topics') && <p><strong>Topics:</strong> {maybe('topics')}</p>}
            {val('summary') && <p><strong>Summary:</strong> {val('summary')}</p>}
            {val('agreementOutcome') && <p><strong>Outcome:</strong> {val('agreementOutcome')}</p>}
            {maybe('keyQuotes') && <p><strong>Key quotes:</strong> {maybe('keyQuotes')?.replace(/, /g, ' • ')}</p>}
          </div>
        );

      default:
        return (
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(s, null, 2)}
          </pre>
        );
    }
  };
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  if (!currentTranscript) {
    return (
      <div className="w-full md:w-4/5 pt-4 min-h-screen mx-auto mt-18 text-center p-4 mt-20">
        <p className="text-xl font-semibold text-text">
          Transcript with ID {transcriptId} not found.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-4/5 mx-auto flex flex-col items-center pt-6 px-4 mt-20 lg:mt-8">
      <div className="w-full max-w-[370px] md:max-w-none">
        <div className="w-full bg-surface rounded-2xl shadow-lg p-4 mb-6 md:hidden">
          <button
            onClick={() =>
              setIsTranscriptSelectorOpen(!isTranscriptSelectorOpen)
            }
            className="w-full flex items-center justify-between text-left py-2 px-3 text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <Description className="text-lg" />
              <span className="font-semibold">
                {currentTranscript.title || "Select Transcript"}
              </span>
            </div>
            {isTranscriptSelectorOpen ? (
              <ExpandLess className="text-lg" />
            ) : (
              <ExpandMore className="text-lg" />
            )}
          </button>

          {isTranscriptSelectorOpen && (
            <div className="mt-2 border-t border-outline pt-2">
              {transcripts.map((transcript) => (
                <button
                  key={transcript.id}
                  onClick={() => {
                    router.push(`/transcripts/${transcript.id}`);
                    setIsTranscriptSelectorOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${currentTranscript.id === transcript.id
                      ? "bg-primary/10 text-primary"
                      : "text-text hover:bg-primary/5"
                    }`}
                >
                  <Description className="text-sm" />
                  {transcript.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="w-full bg-surface rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-6 gap-2">
            <div className="flex items-center gap-3">
              <Description className="text-primary text-4xl" />
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {currentTranscript.title}
                {}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <CalendarToday className="text-sm" />
              <span>
                {currentTranscript.createdAt
                  ? new Date(currentTranscript.createdAt).toLocaleString()
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mb-8 bg-surface rounded-2xl shadow-lg p-6 ">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <AutoAwesome className="text-lg" />
              {showSummary ? "Hide Summary" : "Show Summary"}
            </button>
            <button
              onClick={handleDownloadSummary}
              className="px-6 py-3 border border-outline text-text rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>

        {showSummary && (
          <div className="w-full bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl shadow-lg p-8 mb-8 border border-outline">
            <div className="flex items-center gap-3 mb-4">
              <AutoAwesome className="text-primary text-2xl" />
              <h2 className="text-xl font-semibold text-primary">AI Summary</h2>
            </div>
            <div className="bg-surface rounded-lg p-6">
                  <div className="text-text leading-relaxed whitespace-pre-line">
                    {renderSummary(currentTranscript)}
                  </div>
            </div>
          </div>
        )}

        <div className="w-full bg-surface rounded-2xl shadow-lg mb-8 p-8">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Transcript Content
          </h2>
          <div className="bg-background rounded-lg p-6 border border-outline">
            <p className="text-text leading-relaxed text-justify whitespace-pre-line">
              {currentTranscript.transcription ||
                "No transcript text available."}
            </p>
          </div>

          {/* Transcript Footer */}
          <div className="mt-6 pt-6 border-t border-outline flex items-center justify-between text-sm text-muted">
            <span>Word count: {getWordCount()} words</span>
            <span>Generated by Synthai AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TranscriptView() {
  return (
    <ProtectedRoute>
      <TranscriptViewContent />
    </ProtectedRoute>
  );
}
