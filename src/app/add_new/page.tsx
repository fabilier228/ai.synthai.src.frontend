"use client";

import { Form, Formik, ErrorMessage } from "formik";
import { HeadlessSelect } from "./components/HeadlessSelect";
import * as Yup from "yup";
import { useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

const LOGIC_API_URL = process.env.NEXT_PUBLIC_LOGIC_API_URL || 'https://synthai.pl/api/v1';

function AddNewPageContent() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Stan do ukrywania/pokazywania opcji zaawansowanych
  const [showAdvanced, setShowAdvanced] = useState(false);

  const endpointMap: Record<string, string> = {
    SONG: "/analysis/song",
    LECTURE: "/analysis/lecture",
    AUDIOBOOK: "/analysis/audiobook",
    CONVERSATION: "/analysis/conversation",
  };

  return (
    <div className="mt-20 md:mt-8 w-full md:w-4/5 mx-auto py-8">
      <Formik
        initialValues={{
          type: "SONG",
          file: null as File | null,
          language: "EN",
          title: "",
          // Nowe pola (domyślne wartości)
          temperature: 0.0,
          diarization: false,
          phraseList: [] as string[],
        }}
        validationSchema={Yup.object({
          type: Yup.string().required("Select analysis type"),
          file: Yup.mixed().required("Upload a file"),
          title: Yup.string().required("Enter a title"),
          // Walidacja dla nowych pól (opcjonalna, ale dobra praktyka)
          temperature: Yup.number().min(0).max(2),
          diarization: Yup.boolean(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!user?.sub) {
            setResult("Error: User not authenticated");
            setSubmitting(false);
            return;
          }

          setLoading(true);
          setResult(null);
          try {
            const formData = new FormData();
            if (values.file) {
              formData.append("audioFile", values.file);
              formData.append(
                "language",
                values.language === "PL" ? "POLISH" : "ENGLISH"
              );
              formData.append("keycloakId", user.sub);
              formData.append("title", values.title);
              
              // --- Dodajemy Advanced Options do requestu ---
              formData.append("temperature", values.temperature.toString());
              formData.append("diarization", values.diarization.toString());
              
              // Filtrujemy puste frazy i dodajemy je
              const filteredPhrases = values.phraseList.filter(p => p.trim() !== "");
              filteredPhrases.forEach((phrase) => {
                formData.append("phraseList", phrase.trim());
              });
            }
            
            const endpoint = endpointMap[values.type];
            const res = await fetch(`${LOGIC_API_URL}${endpoint}`, {
              method: "POST",
              body: formData,
            });
            
            if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Server error: ${errorText}`);
            }
            
            const data = await res.json();
            console.log("Response data:", data); // Debug w konsoli

            // Twoja oryginalna logika wyciągania transkrypcji
            const transcript = data?.transcriptionAnalysis?.transcription;
            setResult(transcript ? transcript : "No transcript found.");
            
            resetForm();
            if (fileInputRef.current) fileInputRef.current.value = "";
            setShowAdvanced(false); // Zwiń opcje po sukcesie
            
          } catch (error) {
            console.error("Transcription error:", error);
            setResult(`An error occurred during transcription: ${error instanceof Error ? error.message : 'Unknown error'}`);
          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className="mx-auto p-4 bg-surface rounded-lg shadow-md flex flex-col md:mt-8">
            <h2 className="text-h3 font-heading mb-6 text-center text-text">
              Add New Transcription
            </h2>
            <HeadlessSelect
              options={[
                { value: "SONG", label: "Song" },
                { value: "LECTURE", label: "Lecture" },
                { value: "AUDIOBOOK", label: "Audiobook" },
                { value: "CONVERSATION", label: "Conversation" },
              ]}
              value={values.type}
              onChange={(val) =>
                handleChange({ target: { name: "type", value: val } })
              }
              label="Analysis Type"
              name="type"
              error={
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              }
            />
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-h4 text-secondary font-heading mb-2"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="border border-outline rounded-lg p-3 w-full shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-150 bg-background text-text placeholder:text-text"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <HeadlessSelect
              options={[
                { value: "EN", label: "English" },
                { value: "PL", label: "Polish" },
              ]}
              value={values.language}
              onChange={(val) =>
                handleChange({ target: { name: "language", value: val } })
              }
              label="Language"
              name="language"
            />
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-h4 text-secondary font-heading mb-2"
              >
                Choose audio file
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={values.file ? values.file.name : "No file chosen"}
                  className="border border-outline rounded-lg p-3 flex-1 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-150 bg-background text-text placeholder:text-text"
                  style={{ minWidth: "0" }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setFieldValue(
                      "file",
                      event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null
                    );
                  }}
                />
                <button
                  type="button"
                  className="border border-primary bg-primary text-white rounded-lg px-3 py-1 text-xs shadow-sm hover:bg-primary_muted transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose file
                </button>
              </div>
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* --- SEKCJA ADVANCED OPTIONS START --- */}
            <div className="mb-6 border-t border-outline pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-h4 font-heading text-secondary hover:text-primary transition-colors mb-4"
              >
                <span className={`transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>▶</span>
                Advanced Options
              </button>

              {showAdvanced && (
                <div className="space-y-4 pl-6">
                  {/* Temperature Slider */}
                  <div>
                    <label className="block text-sm text-secondary font-heading mb-2">
                      Temperature: {values.temperature.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      name="temperature"
                      min="0"
                      max="2"
                      step="0.01"
                      value={values.temperature}
                      onChange={handleChange}
                      className="w-full h-2 bg-outline rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Diarization Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="diarization"
                      checked={values.diarization}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary bg-background border-outline rounded focus:ring-2 focus:ring-primary"
                    />
                    <label className="text-sm text-secondary font-heading">
                      Enable Speaker Diarization
                    </label>
                  </div>
                  
                  {/* Phrase List */}
                  <div>
                    <label className="block text-sm text-secondary font-heading mb-2">Phrase List (Vocabulary)</label>
                    <div className="space-y-2">
                        {values.phraseList.map((phrase, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                            type="text"
                            value={phrase}
                            onChange={(e) => {
                                const newList = [...values.phraseList];
                                newList[index] = e.target.value;
                                setFieldValue("phraseList", newList);
                            }}
                            className="flex-1 border border-outline rounded-lg p-2 bg-background text-text"
                            placeholder="Word or phrase"
                            />
                            <button
                            type="button"
                            onClick={() => {
                                const newList = values.phraseList.filter((_, i) => i !== index);
                                setFieldValue("phraseList", newList);
                            }}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                            Remove
                            </button>
                        </div>
                        ))}
                        <button
                        type="button"
                        onClick={() => setFieldValue("phraseList", [...values.phraseList, ""])}
                        className="w-full px-4 py-2 border-2 border-dashed border-outline text-secondary rounded-lg hover:border-primary hover:text-primary"
                        >
                        + Add Phrase
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* --- SEKCJA ADVANCED OPTIONS END --- */}

            <button
              type="submit"
              className="bg-primary text-white text-btn_md px-4 py-2 rounded-md hover:bg-primary_muted transition-colors self-end"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
            {result && (
              <div className="mt-6 p-4 bg-background rounded-md">
                <h3 className="text-h4 font-heading mb-2 text-text">
                  Transcription Result:
                </h3>
                <pre className="text-xs whitespace-pre-wrap break-words text-text">
                  {result}
                </pre>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default function AddNewPage() {
  return (
    <ProtectedRoute>
      <AddNewPageContent />
    </ProtectedRoute>
  );
}