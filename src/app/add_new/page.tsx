'use client';

import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';


export default function AddNewPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  // submission handled by Formik's onSubmit
  

  return (
    <div className="  mt-20 md:mt-8 w-full md:w-4/5 mx-auto py-4">
      <Formik
        initialValues={{
          audio_type: "",
          file: null,
          title: "", // WILL BE ADDED LATER
          language: "ENGLISH",
          keycloakId: "", //WILL BE ADD LATER
        }}
        validationSchema={Yup.object({
          audio_type: Yup.string().required("Please select an audio type"),
          language: Yup.string().required("Please select a language"),
          file: Yup.mixed()
            .required("Please upload a file")
            .test("fileType", "Unsupported file format", (value: unknown) => {
              if (!value) return false;
              const fileType = (value as File).type || "";
              return ["audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp3"].includes(fileType);
            }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
          setSubmitting(true);
          setFormError(null);
          console.log('Submitting analysis request', values);
          try {
            const endpointMap: Record<string, string> = {
              song: '/analysis/song',
              lecture: '/analysis/lecture',
              audiobook: '/analysis/audiobook',
              'phone-call': '/analysis/conversation'
            };
            const endpoint = endpointMap[values.audio_type];
            if (!endpoint) throw new Error('Unsupported audio type');

            if (!values.file) {
              throw new Error('No file provided');
            }
            const formData = new FormData();
            formData.append('audioFile', values.file as unknown as File);
            formData.append('language', values.language);
            formData.append('keycloakId', values.keycloakId);
            formData.append('title', values.title);
            const apiBase = typeof process !== 'undefined' && process?.env?.NEXT_PUBLIC_API_BASE ? process.env.NEXT_PUBLIC_API_BASE : 'http://localhost:8081/api/v1';
            const fullEndpoint = apiBase.replace(/\/$/, '') + endpoint;

            console.log('POST', fullEndpoint);

            const res = await fetch(fullEndpoint, {
              method: 'POST',
              body: formData
            });
            if (!res.ok) {
              const text = await res.text();
              throw new Error(text || 'Server error');
            }

            const json = await res.json();
            alert('Analysis completed: ' + (json.status || 'OK'));
            resetForm();
            if (fileInputRef.current) fileInputRef.current.value = '';
            router.push('/transcripts');
          } catch (err: unknown) {
            console.error('Analysis error', err);
            const message = err instanceof Error ? err.message : String(err);
            setFieldError('file', message || 'Failed to analyze');
            setFormError(message || 'Failed to analyze');
            alert('Failed to analyze file: ' + (message || 'Unknown error'));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, values, setFieldValue, isSubmitting }) => (
          <Form className="mx-auto p-6 bg-surface rounded-lg shadow-md flex flex-col">
            <h2 className="text-h3 font-heading mb-4">Add new Transcript</h2>
            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                {formError}
              </div>
            )}
            <div className="mb-4 flex flex-col justify-start items-start "> 
              <label htmlFor="audio_type" className="block text-h4 font-heading mb-2 text-secondary">
                Audio Type
              </label>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="audio_type"
                  value="song"
                  checked={values.audio_type === "song"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Song
                <div className=" text-muted">Best for music tracks</div>
              </div>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="audio_type"
                  value="lecture"
                  checked={values.audio_type === "lecture"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Lecture
                <div className=" text-muted">Best for educational content</div>
              </div>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="audio_type"
                  value="audiobook"
                  checked={values.audio_type === "audiobook"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Audiobook
                <div className=" text-muted">Best for audiobooks</div>
              </div>
              <div className="mb-4 text-body_md">
                <input 
                  type="radio"
                  name="audio_type"
                  value="phone-call"
                  checked={values.audio_type === "phone-call"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Phone-call
                <div className=" text-muted">Best for phone call recordings</div>
              </div>

              <ErrorMessage name="audio_type" component="div" className="text-red-500 text-sm mt-1" />
            </div>
              

              <div className="mb-4">
                <label htmlFor="language" className="block text-h4 text-secondary font-heading mb-2">Language</label>
                <select name="language" value={values.language} onChange={handleChange} className="border border-outline rounded-md p-2 w-full">
                  <option value="ENGLISH">EN</option>
                  <option value="POLISH">PL</option>
                </select>
                <ErrorMessage name="language" component="div" className="text-red-500 text-sm mt-1" />
              </div>

             
            <div className="mb-4">
              <label htmlFor="file" className="block text-h4 text-secondary font-heading mb-2">
                Upload File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files ? event.currentTarget.files[0] : null);
                }}
                className="border border-outline border-2 rounded-md p-8 w-full"
              />
              <ErrorMessage name="file" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white text-btn_md px-4 py-2 rounded-md hover:bg-primary_muted transition-colors  self-end disabled:opacity-50"
            >
              {isSubmitting ? 'Analyzing...' : 'Submit'}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}