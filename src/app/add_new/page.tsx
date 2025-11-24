"use client";

import { Form, Formik, ErrorMessage } from "formik";
import { HeadlessSelect } from "./components/HeadlessSelect";
import * as Yup from "yup";
import { useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function AddNewPageContent() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        }}
        validationSchema={Yup.object({
          type: Yup.string().required("Select analysis type"),
          file: Yup.mixed().required("Upload a file"),
          title: Yup.string().required("Enter a title"),
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
            }
            const endpoint = endpointMap[values.type];
            const res = await fetch(`http://localhost:8081${endpoint}`, {
              method: "POST",
              body: formData,
            });
            if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Server error: ${errorText}`);
            }
            const data = await res.json();
            const transcript = data?.transcriptionAnalysis?.transcription;
            setResult(transcript ? transcript : "No transcript found.");
            resetForm();
            if (fileInputRef.current) fileInputRef.current.value = "";
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
