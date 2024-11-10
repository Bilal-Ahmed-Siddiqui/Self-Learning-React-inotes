import React, { useContext } from "react";
import Navbar from "./Navbar";
import notesContext from "../contexts/notesContext";
const Home = () => {
  const context = useContext(notesContext);
  const { notes, setnotes } = context;
  return (
    <>
      <Navbar></Navbar>
      <div>home page</div>
      <div className="container">
        <h3>Your notes</h3>
        {notes.map((note) => {
          return note.title;
        })}
      </div>
    </>
  );
};

export default Home;
