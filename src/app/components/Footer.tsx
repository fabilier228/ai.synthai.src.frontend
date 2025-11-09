"use client";
import React from "react";
import { useRouter, usePathname } from 'next/navigation';

const Footer: React.FC = () => {
   const router = useRouter();
    const pathname = usePathname();
    const [activePath, setActivePath] = React.useState(pathname);
  
    React.useEffect(() => {
      setActivePath(pathname);
    }, [pathname]);

  return (
    <>
      {/* Mobile footer */}
      <footer className="block md:hidden w-full bg-surface pt-4 pb-0 border-t-0 z-[90] fixed bottom-10 left-0">
        <div className="flex flex-col justify-between text-btn_b_sm font-sans mb-0.5">
          <div className="flex justify-evenly text-btn_b_sm font-sans mb-0.5">
            <button type="button" onClick={() => router.push("/")} className="bg-transparent">
              Home
            </button>
            <button type="button" onClick={() => router.push("/models")} className="bg-transparent">
              Models
            </button>
            <button type="button" onClick={() => router.push("/add_new")} className="bg-transparent">
              Add new
            </button>
          </div>
          <div className="flex justify-evenly text-btn_b_sm font-sans mb-0.5">
            <button type="button" onClick={() => router.push("/summaries")} className="bg-transparent">
              My summaries
            </button>
            <button type="button" onClick={() => router.push("/profile")} className="bg-transparent">
              Profile
            </button>
          </div>
        </div>

        <div className="mx-auto w-[95%]">
          <div className="border-t mb-0.5 border-primary_muted border-2" />
        </div>

        <div className="flex justify-center text-text text-sm font-semibold pt-0.5">
          <span>Synthai 2025</span>
        </div>
      </footer>

      {/* Desktop footer */}
      <footer className="hidden md:flex flex-col w-full bg-surface pt-4 pb-3 border-t-0">
        <div className="mx-auto w-[50%]">
          <div className="flex justify-between text-text text-btn_sm font-sans mb-0.5">
            <button type="button" onClick={() => router.push("/")} className="bg-transparent">
              Home
            </button>
            <button type="button" onClick={() => router.push("/models")} className="bg-transparent">
              Models
            </button>
            <button type="button" onClick={() => router.push("/add_new")} className="bg-transparent">
              Add new
            </button>
            <button type="button" onClick={() => router.push("/summaries")} className="bg-transparent">
              My summaries
            </button>
            <button type="button" onClick={() => router.push("/profile")} className="bg-transparent">
              Profile
            </button>
          </div>
        </div>

        <div className="mx-auto w-[50%]">
          <div className="border-t border-2 border-primary_muted my-3" />
        </div>

        <div className="flex justify-center text-text text-body_lg font-sans pt-1.5">
          <span>Synthai 2025</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
