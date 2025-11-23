"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopSection = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center pt-6 ">
      <h1
        className="hidden md:block w-full text-styled_lg font-styled leading-[110%] tracking-tight text-center text-primary mt-4 max-w-none"
      >
        Turn Any Audio Into Clear, Concise Insights
      </h1>
      <div className="hidden md:flex flex-row items-stretch justify-between py-4 gap-12 mt-4 w-full max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6 order-1 lg:order-1">
            <div className="bg-surface flex items-center justify-center rounded-[16px] p-6 flex-1">
              <p className="text-h4 font-heading lg:text-h3 text-left w-full m-0">
                Synthai automatically transcribes and summarizes your recordings — lectures, meetings, songs, or conversations — so you can focus on what really matters.
              </p>
            </div>

             <div className="hidden md:flex items-center justify-start rounded-[16px] flex-1">
              <button className="bg-primary text-white text-h4 font-heading md:text-h3 py-4 px-6 rounded-[16px] hover:bg-primary/90 transition-colors w-full max-w-[350px]" onClick={() => router.push('/flow')}>
                See out Process Flow
              </button>
            </div>

            <div className="hidden md:flex flex-1 bg-surface items-center justify-center rounded-[16px] p-6 lg:flex">
              <span className="text-h5 md:text-h4 font-heading text-left w-full m-0">
                Over 10,000 hours of audio transformed into clear insights.
              </span>
            </div>

           
          </div>

          <div className="order-2 lg:order-2 flex items-center justify-center">
            <div className="relative w-full pb-[100%] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/intro-desktop.png"
                alt="intro"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* BOX 2 i BOX 3 na tablet i mobile — full width pod spodem */}
          <div className="md:hidden bg-surface flex items-center justify-center rounded-[16px] p-6">
            <span className="text-h5 md:text-h4 font-heading text-left w-full m-0">
              Over 10,000 hours of audio transformed...
            </span>
          </div>

          <div className="md:hidden flex items-center justify-start rounded-[16px]">
            <button className="bg-primary text-white text-h4 font-heading py-4 px-6 rounded-[16px] hover:bg-primary/90 transition-colors w-full max-w-[350px]" onClick={() => router.push('/flow')} >
              See out Process Flow
            </button>
          </div>
        </div>

        
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center w-full gap-4 ">
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
            onClick={() => router.push('/flow')}
          >
            See our Process Flow
          </button>
        </div>
        <div className="w-full max-w-[370px] flex flex-col items-center">
          <Image
            src="/intro-mobile.png"
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
