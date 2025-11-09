"use client";
import React from "react";
import {
  HomeFilled,
  ModelTraining,
  AddCircleOutline,
  LocalLibrary,
  Person,
} from "@mui/icons-material";
import { useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
import Header from "./Header";



export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = React.useState(pathname);

  React.useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  return (
    <>
      <nav className="fixed left-0 bottom-0 w-screen bg-surface border-t border-outline py-2 z-[100] flex md:hidden">
        <ul className="flex flex-row justify-between items-center w-full m-0 p-0 list-none">
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => router.push("/")}>
              <HomeFilled
              />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <ModelTraining className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <button onClick={() => router.push("/add_new")}>
              <AddCircleOutline className={`text-[2.2rem] transition-colors duration-200 `} />
            </button>
          </li>
          <li className="flex-1 flex justify-center items-center">
            <LocalLibrary className="text-[2.2rem] text-primary_muted transition-colors duration-200" />
          </li>
          <li className="flex-1 flex justify-center items-center">
            <Link href="/profile">
              <Person
                className={`text-[2.2rem] transition-colors duration-200 `}
              /></Link>


          </li>
        </ul>
      </nav>
      <nav
        className="hidden md:flex flex-col gap-2 w-64 fixed left-0 z-[102] top-1/3 transform -translate-y-1/2 pt-2 pb-4 px-6 bg-surface"

      >
        <span className="block text-primary text-styled_md  tracking-wide text-left leading-tight font-styled mb-4 ">
            Synthai
          </span>
        <button onClick={() => router.push("/")} className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${activePath === "/" ? "text-primary" : "text-primary_muted"}`}>
          Home
        </button>
        <button  onClick={() => router.push("/models")} className={`text-left transition-colors text-btn_sm py-2 px-2 ${activePath === "/models" ? "text-primary" : "text-primary_muted"}`}>
          Our models
        </button>

        <button
          onClick={() => router.push("/add_new")}
          className={`text-left transition-colors text-btn_sm py-2 px-2 ${activePath === "/add_new" ? "text-primary" : "text-primary_muted"}`}
        >
          Add new
        </button>
        <button
          onClick={() => router.push("/summaries")}
          className={`text-left transition-colors text-btn_sm mb-1 py-2 px-2 ${activePath === "/summaries" ? "text-primary" : "text-primary_muted"}`}
        >
          My summaries
        </button>
        <button
          onClick={() => router.push("profile")}
          className={`text-left transition-colors text-btn_sm py-2 px-2 ${activePath === "/profile" ? "text-primary" : "text-primary_muted"}`}
        >
          Profile
        </button>
      </nav>
    </>
  );
};

