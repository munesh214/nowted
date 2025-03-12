import Restore from "./Restore";
import NoteEdit from "./NoteEdit";
import NoNoteSelected from "./NoNoteSelected";
import { useParams } from "react-router";

const RightPanel = () => {
  const { isTrash, isFavorite, isArchive, noteId } = useParams();

  return (
    <>
      {isTrash && noteId ? (
        <Restore />
      ) : isFavorite && noteId ? (
        <NoteEdit />
      ) : isFavorite ? (
        <NoNoteSelected />
      ) : isArchive && noteId ? (
        <NoteEdit />
      ) : isArchive ? (
        <NoNoteSelected />
      ) : noteId ? (
        <NoteEdit />
      ) : (
        <NoNoteSelected />
      )}
    </>
  );
};

export default RightPanel;
