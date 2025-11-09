import React from "react";

const Header = () => {
  return (
    <>
      {/* Mobile header (top bar) */}
      <header className="flex md:hidden w-screen bg-surface border-b border-outline px-6 py-3 fixed top-0 left-0 z-[101] items-center">
        <span className="text-primary text-styled_md font-styled tracking-wide text-left w-full">
          Synthai
        </span>
      </header>     
    </>
  );
};

export default Header;
