"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const TopSection = () => {
  const [isIphoneSE, setIsIphoneSE] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsIphoneSE(window.innerWidth <= 375);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isIphoneSE) {
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ maxWidth: 375, margin: "0 auto", height: 375 }}
      >
        <Image
          src="/intro.png"
          alt="Synthai intro"
          width={375}
          height={375}
          className="rounded-xl shadow-lg object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* DESKTOP */}
      <h1
        className="hidden md:block w-full font-extrabold text-[48px] leading-[110%] tracking-tight text-center text-primary mt-12"
        style={{ fontFamily: "Exo 2, sans-serif" }}
      >
        Turn Any Audio Into Clear, Concise Insights
      </h1>
      <div className="hidden md:flex flex-row items-center justify-between px-16 py-20 gap-12 mt-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col max-w-[600px] w-full gap-6 md:h-[500px]">
          <div className="flex flex-col gap-6 md:h-full">
            <div className="bg-surface flex items-center justify-center rounded-[16px] p-6 md:flex-1">
              <p
                className="text-lg text-left w-full m-0"
                style={{ fontFamily: "Urbanist, sans-serif" }}
              >
                Synthai automatically transcribes and summarizes your recordings
                — lectures, meetings, songs, or conversations — so you can focus
                on what really matters.
              </p>
            </div>
            <div className="flex items-center justify-start rounded-[16px] md:flex-1">
              <button className="bg-primary text-white font-bold text-xl py-4 px-6 rounded-[16px] hover:bg-primary/90 transition-colors w-full max-w-[350px]">
                Explore our AI models
              </button>
            </div>
            <div className="bg-surface flex items-center justify-center rounded-[16px] p-6 md:flex-1">
              <span className="text-base text-left w-full m-0">
                Over 10,000 hours of audio transformed into clear insights.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-shrink-0">
          <Image
            src="/intro.png"
            alt="Synthai intro"
            width={500}
            height={500}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center w-full gap-2 px-4 py-6 mt-16">
        <div className="bg-surface rounded-[16px] w-full max-w-[370px] p-4 flex flex-col items-center">
          <h4
            className="font-bold text-[20px] leading-[150%] text-center w-full"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            Synthai automatically transcribes and summarizes your recordings —
            lectures, meetings, songs, or conversations — so you can focus on
            what really matters.
          </h4>
        </div>
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <button
            className="w-full h-[88px] bg-primary text-white font-bold text-lg rounded-[16px] flex items-center justify-center mt-2"
            style={{ gap: "10px" }}
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
          <span className="text-center text-base w-full">
            Over 10,000 hours of audio transformed into clear insights.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
