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
      "From university lectures to phone calls, interviews, podcasts, or even songs, Synthai adapts to your needs.",
  },
];

const FeatureSection = () => {
  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      <h2 className=" mb-10 text-primary text-center max-w-[370px] md:max-w-none text-styled_lg font-styled">
        Features
      </h2>
      <div className="w-full max-w-[370px] md:max-w-none flex flex-col md:flex-row gap-8 justify-center">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex-1 bg-surface rounded-2xl shadow-lg flex flex-col items-center text-center p-8 w-full md:w-auto mx-auto md:max-w-[300px]"
          >
            <h3 className={`text-h4 font-heading mb-4 ${f.titleClass}`}>
              {f.title}
            </h3>
            <p className="text-body_md md:text-body_lg  font-sans text-text">{f.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
