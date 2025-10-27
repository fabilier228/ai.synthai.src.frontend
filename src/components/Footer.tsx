import React from "react";

const Footer = () => {
  return (
    <>
      {/* Mobile footer */}
      <footer className="block md:hidden w-full bg-surface pt-2 pb-1 border-t-0 z-[101] fixed bottom-12 left-0">
        <div className="mx-auto w-[60%]">
          <div className="flex justify-between text-text text-sm font-bold mb-0.5">
            <span>Home</span>
            <span>Home</span>
            <span>Home</span>
          </div>
          <div className="flex justify-evenly text-text text-sm font-bold mb-0.5">
            <span>Home</span>
            <span>Home</span>
          </div>
        </div>
        <div className="mx-auto w-[95%]">
          <div
            className="border-t mb-0.5"
            style={{ borderColor: "var(--primary_muted)" }}
          />
        </div>
        <div className="flex justify-center text-text text-sm font-semibold pt-0.5">
          <span>Synthai 2025</span>
        </div>
      </footer>
      {/* Desktop footer */}
      <footer className="hidden md:flex flex-col w-full bg-surface pt-4 pb-3 border-t-0">
        <div className="mx-auto w-[30%]">
          <div className="flex justify-between text-text text-sm font-bold mb-0.5">
            <span>Home</span>
            <span>Home</span>
            <span>Home</span>
            <span>Home</span>
            <span>Home</span>
          </div>
        </div>
        <div className="mx-auto w-[50%]">
          <div
            className="border-t my-3"
            style={{ borderColor: "var(--primary_muted)" }}
          />
        </div>
        <div className="flex justify-center text-text text-sm font-semibold pt-1.5">
          <span>Synthai 2025</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
