import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const faqs = [
  {
    question: "What audio formats do you support?",
    answer:
      "We support a wide range of audio and video formats, including MP3, WAV, M4A, AAC, and MP4. Just upload your file, and we'll handle the rest.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We prioritize your privacy and security. All data is encrypted both in transit and at rest, and we never share your files or transcripts with third parties.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "Our AI models achieve industry-leading accuracy, often reaching up to 95-98% for clear audio. Accuracy can vary depending on audio quality, background noise, and speaker accents.",
  },
];

const FQASection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      <h2
        className="text-styled_md font-styled md:text-styled_lg font-extrabold text-primary text-center mb-12 max-w-[370px] md:max-w-none"
        style={{ fontFamily: "sans-serif" }}
      >
        FAQ (Frequently Asked Questions)
      </h2>
      <div className="w-full max-w-[370px] md:max-w-none bg-surface rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-surface rounded-2xl shadow flex flex-col p-6 border border-outline"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => toggleExpand(i)}
            >
              <button className="text-text text-lg font-normal">
                {expandedItems.includes(i) ? <ExpandLess /> : <ExpandMore />}
              </button>
              <span className="text-text text-h5 md:text-h4 font-heading ">
                Q: {faq.question}
              </span> 
            </div>
            {expandedItems.includes(i) && faq.answer && (
              <div className="flex items-start gap-3 mt-4 ml-6 text-body_md md:text-body_lg text-text font-sans ">
                <span className=" font-semibold ">A:</span>
                <span className=" ">{faq.answer}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FQASection;
