import React from "react";
import {
  HomeFilled,
  ModelTraining,
  AddCircleOutline,
  LocalLibrary,
  Person,
} from "@mui/icons-material";

const Navbar = () => {
  return (
    <>
      {/* Mobile navbar (bottom, icons) */}
      <nav className="fixed left-0 bottom-0 w-screen bg-surface border-t border-outline py-2 z-[100] flex md:hidden">
        <ul className="flex flex-row justify-between items-center w-full m-0 p-0 list-none">
          <li className="flex-1 flex justify-center items-center">
            <HomeFilled className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <ModelTraining className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <AddCircleOutline className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <LocalLibrary className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <Person className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
        </ul>
      </nav>
      {/* Desktop navbar (left, text links) */}
      <nav
        className="hidden md:flex flex-col gap-2 w-64 fixed left-0 z-[102] pt-2 pb-4 px-6 bg-surface"
        style={{ top: "5.5rem" }}
      >
        <a
          href="#"
          className="text-primary_muted hover:text-primary transition-colors text-btn_sm mb-1 py-2 px-2"
        >
          Home
        </a>
        <a
          href="#"
          className="text-primary_muted hover:text-primary transition-colors text-btn_sm mb-1 py-2 px-2"
        >
          About our ai models
        </a>
        <a
          href="#"
          className="text-primary_muted hover:text-primary transition-colors text-btn_sm mb-1 py-2 px-2"
        >
          Add new
        </a>
        <a
          href="#"
          className="text-primary_muted hover:text-primary transition-colors text-btn_sm mb-1 py-2 px-2"
        >
          My summuries
        </a>
        <a
          href="#"
          className="text-primary_muted hover:text-primary transition-colors text-btn_sm py-2 px-2"
        >
          Profile
        </a>
      </nav>
    </>
  );
};

export default Navbar;
