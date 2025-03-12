import dateLogo from "../../assets/datelogo.png";
import folderLogo from "../../assets/folder.png";
import Options from "./Options";
import { useParams } from "react-router";
import { Note } from "../../types/types";
import { useState, useRef, useEffect, useContext } from "react";
import { setNote } from "../../services/api";
import useFetchNote from "../../hooks/useFetchNote";
import Restore from "./Restore";
import { TriggerNotesListContext } from "../../context/TriggerNotesListContext";
import FolderChangeDropbox from "./FolderChangeDropbox";

const NoteEdit = () => {
  const { noteId } = useParams();
  const [noteData, setNoteData] = useState<Note>();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const { note, loading, error } = useFetchNote(noteId!);
  const [isDeleted, setIsDeleted] = useState<boolean>(
    note?.deletedAt ? true : false
  );
  const debounceTimer = useRef<number | null>(null);
  const { setTrigger } = useContext(TriggerNotesListContext);

  // Only set noteData when the note is fetched successfully
  useEffect(() => {
    if (note) {
      setNoteData(note);
      setNoteTitle(note.title);
      setNoteContent(note.content || "");
      setIsDeleted(note?.deletedAt ? true : false);
    }
  }, [note]);

  if (loading) return <p className="text-white text-xl">Loading...</p>;
  if (error) return <p>Error Occured in Fetching noteData</p>;

  const handleUpdate = (updatedTitle: string, updatedContent: string) => {
    setNoteTitle(updatedTitle);
    setNoteContent(updatedContent);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      if (!noteData) return;
      const updatedNote = {
        ...noteData,
        title: updatedTitle,
        content: updatedContent,
      };

      await setNote(updatedNote);
      setTrigger!((p) => !p);
    }, 1500);
  };

  if (isDeleted) return <Restore setIsDeleted={setIsDeleted} />;
  return (
    <div className="w-full p-10 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between relative">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => {
            handleUpdate(e.target.value, noteContent);
          }}
          className="text-white text-2xl font-semibold bg-transparent outline-none"
        />
        {noteData && <Options noteD={noteData} setIsDeleted={setIsDeleted} />}
      </div>

      <div className="text-sm">
        <div className="flex items-center gap-20 py-5 border-b border-theme-light-grey">
          <div className="flex items-center gap-5">
            <img src={dateLogo} alt="dateLogo" />
            <p className="text-theme-light-grey">Date</p>
          </div>
          <div>
            <p className="text-white underline">
              {noteData?.createdAt.slice(0, 10)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-20 py-5">
          <div className="flex items-center gap-5">
            <img src={folderLogo} alt="Folder Logo" />
            <p className="text-theme-light-grey">Folder</p>
          </div>
          <div>
            <p className="text-white underline"><FolderChangeDropbox folderName={noteData?.folder.name} noteId={noteId} /></p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <textarea
          value={noteContent}
          onChange={(e) => handleUpdate(noteTitle, e.target.value)}
          placeholder="Write Your Note Here..."
          className="w-full h-full text-white bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default NoteEdit;
