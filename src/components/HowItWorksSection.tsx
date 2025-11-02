import React from "react";

const steps = [
  {
    title: "Step 1 Choose your model",
    description:
      "Securely upload any audio or video file. We support all major formats like MP3, WAV, MP4, and more.",
  },
  {
    title: "Step 2 Upload audio",
    description:
      "Securely upload any audio or video file. We support all major formats like MP3, WAV, MP4, and more.",
  },
  {
    title: "Step 3 Let our AI do the work",
    description:
      "Our advanced AI gets to work, accurately transcribing and identifying key points, speakers, and action items.",
  },
  {
    title: "Step 4 Get summary and transcript",
    description:
      "Receive a precise transcript and a clean, structured summary in minutes. Ready to read, copy, or export.",
  },
];

const HowItWorksSection = () => (
  <section className="w-full flex flex-col items-center py-12 px-4 h-full">
    <h2 className="text-3xl font-extrabold mb-10 text-primary text-center">
      How it works?
    </h2>
    <div className="w-full h-full mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8 max-w-[370px] md:max-w-none md:w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg mt-1">
            {i + 1}
          </span>
          <div>
            <div className="font-bold text-lg mb-1 text-primary">
              {step.title}
            </div>
            <div className="text-base text-gray-700 font-normal">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
