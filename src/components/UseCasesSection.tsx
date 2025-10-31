import React from "react";

const useCases = [
  "For Students - Upload your lectures and get clear summaries in minutes.",
  "For Professionals - Record your meetings or calls and let Synthai create accurate summaries and action points.",
  "For Creators - Turn your podcasts, interviews, or songs into searchable, structured text.",
  "For Anyone - Transform hours of audio into minutes of insight.",
];

const UseCasesSection = () => (
  <section className="w-full flex flex-col items-center py-12 px-4 h-full">
    <div className="w-full h-full mx-auto max-w-[370px] md:max-w-[600px] md:w-full">
      <h2 className="text-3xl font-extrabold mb-8 text-primary text-center">
        Use Cases
      </h2>
      <ul className="w-full flex flex-col gap-4 bg-surface rounded-2xl shadow-lg p-8">
        {useCases.map((text, i) => (
          <li key={i} className="flex items-start text-lg">
            <span className="mt-1 mr-3 text-secondary text-2xl">•</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default UseCasesSection;
