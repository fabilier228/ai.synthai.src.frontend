"use client";
import React from "react";
import Image from "next/image";

const TopSection = () => {
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* DESKTOP */}
      <h1
        className="hidden md:block w-full text-styled_lg font-styled leading-[110%] tracking-tight text-center text-primary mt-12 max-w-none"
      >
        Turn Any Audio Into Clear, Concise Insights
      </h1>
      <div className="hidden md:flex flex-row items-stretch justify-between py-4 gap-12 mt-4 w-full max-w-none">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 max-w-[50%] gap-6 min-h-0">
          <div className="flex flex-col gap-6 h-full">
            <div className="bg-surface flex items-center justify-center rounded-[16px] p-6 flex-1">
              <p
                className="text-h4 font-heading md:text-h3 text-left w-full m-0"
              >
                Synthai automatically transcribes and summarizes your recordings
                — lectures, meetings, songs, or conversations — so you can focus
                on what really matters.
              </p>
            </div>
            <div className="flex items-center justify-start rounded-[16px] flex-1">
              <button className="bg-primary text-white text-h4  font-heading md:text-h3 py-4 px-6 rounded-[16px] hover:bg-primary/90 transition-colors w-full max-w-[350px]">
                Explore our AI models
              </button>
            </div>
            <div className="bg-surface flex items-center justify-center rounded-[16px] p-6 flex-1">
              <span className="text-h5 md:text-h4 font-heading text-left w-full m-0">
                Over 10,000 hours of audio transformed into clear insights.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-shrink-0 flex items-stretch">
          <Image
            src="/intro.png"
            alt="Synthai intro"
            width={500}
            height={500}
            className="rounded-xl shadow-lg object-cover w-auto h-full min-h-[400px]"
            priority
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center w-full gap-2 px-4 py-6">
        <div className="bg-surface rounded-[16px] w-full max-w-[370px] p-4 flex flex-col items-center">
          <h4
            className="font-bold text-h4 leading-[150%] font-heading text-center w-full"
          >
            Synthai automatically transcribes and summarizes your recordings —
            lectures, meetings, songs, or conversations — so you can focus on
            what really matters.
          </h4>
        </div>
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <button
            className="w-full h-[88px] bg-primary text-white font-bold text-h4 font-heading rounded-[16px] flex items-center justify-center mt-2"
          >
            Explore our AI models
          </button>
        </div>
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <Image
            src="/intro.png"
            alt="Synthai intro"
            width={370}
            height={200}
            className="rounded-xl shadow-lg object-cover mt-2 w-full"
            priority
          />
        </div>
        <div className="bg-surface rounded-[16px] w-full max-w-[370px] p-4 flex flex-col items-center">
          <span className="text-center text-h5 w-full font-heading">
            Over 10,000 hours of audio transformed into clear insights.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
