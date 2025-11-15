'use client';

import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useRouter } from 'next/navigation';


export default function AddNewPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div className="  mt-20 md:mt-8 w-full md:w-4/5 mx-auto py-4">
      <Formik
        initialValues={{
          model: "",
          file: null,
        }}
        validationSchema={Yup.object({
          model: Yup.string().required("Please select a model"),
          file: Yup.mixed()
            .required("Please upload a file")
            .test("fileType", "Unsupported file format", (value: unknown) => {
              if (!value) return false;
              const fileType = (value as File).type || "";
              return ["audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp3"].includes(fileType);
            }),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log("Form data", values);
            setSubmitting(false);
            resetForm();
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            alert("Transcript added successfully!");
            router.push("/transcripts/1")
          }, 400);
        }
        }
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className="mx-auto p-6 bg-surface rounded-lg shadow-md flex flex-col">
            <h2 className="text-h3 font-heading mb-4">Add new Transcript</h2>
            <div className="mb-4 flex flex-col justify-start items-start "> 
              <label htmlFor="model" className="block text-h4 font-heading mb-2 text-secondary">
                Model
              </label>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="model"
                  value="Model A"
                  checked={values.model === "Model A"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Model A
                <div className=" text-muted">model A description</div>
              </div>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="model"
                  value="Model B"
                  checked={values.model === "Model B"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Model B
                <div className=" text-muted">model B description</div>
              </div>
              <div className="mb-4 text-body_md">
                <input
                  type="radio"
                  name="model"
                  value="Model C"
                  checked={values.model === "Model C"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Model C
                <div className=" text-muted">model C description</div>
              </div>
              <div className="mb-4 text-body_md">
                <input 
                  type="radio"
                  name="model"
                  value="Model D"
                  checked={values.model === "Model D"}
                  onChange={handleChange}
                  className=" mr-2 "
                />
                Model D
                <div className=" text-muted">model D description</div>
              </div>

              <ErrorMessage name="model" component="div" className="text-red-500 text-sm mt-1" />
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
              className="bg-primary text-white text-btn_md px-4 py-2 rounded-md hover:bg-primary_muted transition-colors  self-end "
            >
              Submit
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}