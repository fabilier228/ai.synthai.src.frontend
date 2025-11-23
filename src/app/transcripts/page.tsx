"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllTranscriptsPage() {
  const router = useRouter();
  const [transcripts, setTranscripts] = useState<
    { id: string; name: string; date?: string }[]
  >([]);
  interface TranscriptApi {
    id: string | number;
    title?: string;
    date?: string;
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const keycloakId = "demo-user";

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8081/api/v1/transcriptions/user/${keycloakId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.transcriptions) {
          setTranscripts(
            data.transcriptions.map((t: TranscriptApi) => ({
              id: t.id?.toString(),
              name: t.title || `Transcript ${t.id}`,
              date: t.date || "",
            }))
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch transcripts.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full md:w-4/5 pt-4 mx-auto mt-20 lg:mt-8">
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      {!loading && !error && transcripts.length === 0 && (
        <div className="text-center py-8 text-muted">No transcripts found.</div>
      )}
      {transcripts.map((transcript) => (
        <button
          key={transcript.id}
          className="w-full flex gap-2 p-4 mb-4 bg-surface rounded-lg hover:shadow-md transition-shadow duration-200"
          onClick={() => router.push(`/transcripts/${transcript.id}`)}
        >
          <div className="flex gap-2">
            <h2 className="text-lg font-semibold">{transcript.name}</h2>
            <p className="text-sm text-muted">ID: {transcript.id}</p>
          </div>
          <p className="text-sm text-muted ml-auto">Date: {transcript.date}</p>
        </button>
      ))}
    </div>
  );
}
