import React from "react";

const Header = () => {
  return (
    <>
      {/* Mobile header (top bar) */}
      <header className="flex md:hidden w-screen bg-surface border-b border-outline px-6 py-3 fixed top-0 left-0 z-[101] items-center">
        <span className="text-primary text-2xl font-extrabold tracking-wide text-left w-full font-styled text-h1">
          Synthai
        </span>
      </header>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-surface fixed top-0 left-0 z-[101] p-6">
        <div className="pl-1">
          <span className="block text-primary text-4xl font-extrabold tracking-wide text-left leading-tight font-styled text-h1">
            Synthai
          </span>
        </div>
      </aside>
    </>
  );
};

export default Header;
