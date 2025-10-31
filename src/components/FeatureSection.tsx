import React from "react";

const features = [
  {
    title: "Accurate Transcriptions",
    titleClass: "text-secondary",
    content:
      "Get precise, time-stamped transcriptions of your audio in seconds, powered by advanced AI speech recognition.",
  },
  {
    title: "Smart Summaries",
    titleClass: "text-secondary",
    content:
      "Synthai understands context and generates clean, human-like summaries that capture every key idea.",
  },
  {
    title: "Supports Any Audio",
    titleClass: "text-secondary",
    content:
      "From university lectures to phone calls, interviews, podcasts, or even songs Synthai adapts to your needs.",
  },
];

const FeatureSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-12 px-4">
      <h2 className="text-3xl font-extrabold mb-10 text-primary">Feature</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="flex-1 bg-surface rounded-2xl shadow-lg p-8 flex flex-col items-center text-center min-w-[260px] w-full md:w-auto max-w-[370px] mx-auto"
          >
            <h3 className={`text-xl font-bold mb-4 ${f.titleClass}`}>
              {f.title}
            </h3>
            <p className="text-base text-text">{f.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
