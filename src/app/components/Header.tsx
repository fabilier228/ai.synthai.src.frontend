import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <>
      {/* Mobile header (top bar) */}
      <header className="flex lg:hidden w-full bg-surface border-b border-outline px-6 py-3 fixed top-0 left-0 z-[101] items-center">
        <span className=" flex gap-2 items-center text-primary text-styled_md font-styled tracking-wide text-left w-full">
          <Image
                      src="/logo.jpg"
                      alt="Synthai logo"
                      width={56}
                      height={56}
                      className="rounded-full shadow-md object-cover w-14 h-14 ring-2 ring-primary/20"
                      priority
                    />
          Synthai
        </span>
      </header>
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-surface fixed top-0 left-0 z-[101] p-6">
       
      </aside>
    </>
  );
};

export default Header;
