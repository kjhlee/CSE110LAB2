import {Label, Note} from "./types"
import { dummyNotesList } from "./constants"
// import { ClickCounter } from "./starterFiles/hooksExercise"
import { FavoriteToggle } from './starterFiles/favoriteExercise';
import { useState, useEffect } from 'react'
import { ToggleTheme } from './starterFiles/toggleTheme'
import { ThemeContext, themes} from './starterFiles/themeContext'
import './App.css';

function App(){
  // have to put at the beginning
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  // all states
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currTheme, setCurrTheme] = useState(themes.light);
  const [notes, setNotes] = useState(dummyNotesList);

  const[selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const[createNote, setCreateNote] = useState(initialNote);

  // filters the note
  const delNote = (noteId: number) => {
    const updateList = notes.filter(note => note.id !== noteId);
    setNotes(updateList); 
  };
  // Creates a new note
  const makeNote = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  

  // Toggles the theme of the entire site
  const toggleTheme = () => {
    console.log(currTheme);
    setCurrTheme(currTheme === themes.light ? themes.dark : themes.light);
  };

  // handles list logic for the favorited notes
  const updateFavorites = (note: string, isFavorite: boolean) => {
    setFavorites((prevFavorites) => {
      
      if (isFavorite == true) {
        // console.log(updateFavorites)
        return [...prevFavorites, note];
      } else {
        // console.log(updateFavorites)
        return prevFavorites.filter((favNote) => favNote !== note);
      }
    });
  };
  
  return (
    //wrap the entire page so i can change theme
    <ThemeContext.Provider value={{theme: currTheme, toggleTheme}}>
    <div className = {`app-container ${currTheme === themes.light ? 'light' : 'dark'}`}>
      <form className = "note-form" onSubmit = {makeNote}>
        <div className = "Title"><input placeholder = "Note Title" onChange = {(event)=>setCreateNote({...createNote, title:event.target.value})} required></input></div>
        <div className = "textBox"><textarea onChange = {(event) => setCreateNote({...createNote, content: event.target.value})} required></textarea></div>
        <div className = "selector">
          <select onChange = {(event) => setCreateNote({...createNote, label: event.target.value as Label})}required>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
          </select>
        </div>
        <div><button type = "submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
            <FavoriteToggle note={note.title} updateFavorites = {updateFavorites}></FavoriteToggle>
            <button onClick={() => delNote(note.id)}>x</button>
           </div>
           <h2> {note.title} </h2>
           <p contentEditable = "true" onChange = {(event) => {const target = event.target as HTMLElement; setSelectedNote({ ...selectedNote, content: target.innerText });}}> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
     </div>
     <div className = "favoritesList">
      <h3>List of Favorites</h3>
        <ul>
            {favorites.map((favorite, index) => (
                <li key={index}>{favorite}</li>
            ))}
        </ul>
      </div>
      <div className = "togtheme">
      <ToggleTheme />
      </div>

    </div>
    </ThemeContext.Provider>

  );
}


export default App;

