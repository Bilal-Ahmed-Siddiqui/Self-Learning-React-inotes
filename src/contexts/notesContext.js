import { createContext, useState } from "react";

const notesContext = createContext();

export const NotesState = (props) => {
  const initialState = [
    {
      _id: "662240ef999f6637dd9561de",
      user: "6622231f22a3929feddf7b34",
      title: "abc",
      description: "abc",
      tag: "abc",
      date: "2024-04-19T10:01:19.751Z",
      __v: 0,
    },
    {
      _id: "662241329b945f2403d38fb4",
      user: "6622231f22a3929feddf7b34",
      title: "abc",
      description: "abc",
      tag: "abc",
      date: "2024-04-19T10:02:26.269Z",
      __v: 0,
    },
  ];

  const [notes, setnotes] = useState(initialState);
  return (
    <notesContext.Provider value={{ notes, setnotes }}>
      {props.children}
    </notesContext.Provider>
  );
};

export default notesContext;
