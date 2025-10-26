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
    <nav className="fixed left-0 bottom-0 w-screen bg-surface border-t border-outline py-2 z-[100]">
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
  );
};

export default Navbar;
