import React from "react";
import {
  HomeFilled,
  ModelTraining,
  AddCircleOutline,
  LocalLibrary,
  Person,
} from "@mui/icons-material";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <HomeFilled />
        </li>
        <li>
          <ModelTraining />
        </li>
        <li>
          <AddCircleOutline />
        </li>
        <li>
          <LocalLibrary />
        </li>
        <li>
          <Person />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
