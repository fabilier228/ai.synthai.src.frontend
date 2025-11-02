import React from "react";

const Footer = () => {
  return (
    <>
      {/* Mobile footer */}
      <footer className="block md:hidden w-full bg-surface pt-4 pb-0 border-t-0 z-[101] fixed bottom-10 left-0">
          <div className="flex flex-col justify-between text-btn_b_sm font-sans mb-0.5">   
            <div className="flex justify-evenly text-btn_b_sm font-sans mb-0.5">
            <span>Home</span>
            <span>About</span>
            <span>Add new</span>
            </div>
            <div className="flex justify-evenly text-btn_b_sm font-sans mb-0.5">
            <span>My summaries</span>
            <span>Profile</span>
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
        <div className="mx-auto w-[50%]">
          <div className="flex justify-between text-text text-btn_md font-sans mb-0.5">
            <span >Home</span>
            <span >About</span>
            <span >Add new</span>
            <span >My summaries</span>
            <span >Profile</span>
          </div>
        </div>
        <div className="mx-auto w-[50%]">
          <div
            className="border-t border-2 border-primary_muted my-3"
          />
        </div>
        
        <div className="flex justify-center text-text text-body_lg font-sans pt-1.5">
          <span>Synthai 2025</span>
        </div>

      </footer>
    </>
  );
};

export default Footer;
