import options from "../../assets/options.png";
import { useContext, useState } from "react";
import favoriteIcon from "../../assets/favorite.png";
import archivedIcon from "../../assets/archivedactive.png";
import trashIcon from "../../assets/trashactive.png";
import { deleteNote, setNote } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { Note } from "../../types/types";
import { TriggerNotesListContext } from "../../context/TriggerNotesListContext";

const Options = ({
  noteD,
  setIsDeleted,
}: {
  noteD: Note;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const param = useParams();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(noteD.isFavorite);
  const [isArchive, setIsArchive] = useState<boolean>(noteD.isArchived);
  const { setTrigger } = useContext(TriggerNotesListContext);

  const handleChangeArchiveStatus = async () => {
    setIsArchive((p) => !p);
    const updatedNote = {
      ...noteD,
      isArchived: !isArchive,
    };

    await setNote(updatedNote);
    if (!param.isArchive) setTrigger!((p) => !p);
    alert(
      !isArchive
        ? "Note Sucessfully Archived!"
        : "Note Successfully Unarchived!"
    );

    if (param.isFavorite) navigate(`/favorite/true/`);
    else if (param.isArchive)
      navigate(`/${noteD.folder.name}/${noteD.folderId}/${noteD.id}`);
    else navigate(`/${noteD.folder.name}/${noteD.folderId}`);
  };

  const handleChangeFavoriteStatus = async () => {
    setIsFavorite((prev) => !prev); // Update local state immediately
    const updatedNote = {
      ...noteD,
      isArchive:isArchive,
      isFavorite: !isFavorite, // Use the latest isFavorite state
    };
    await setNote(updatedNote); // API update
    if (param.isFavorite) setTrigger!((prev) => !prev); // Trigger UI update for NotesPanel(middle component)
    if (param.isFavorite) navigate(`/favorite/true`); // Redirect if needed
  };

  const deleteNoteFunction = async (noteId: string) => {
    if (noteId) {
      if (confirm("Are you sure you want to delete this note?")) {
        await deleteNote(noteId);
        alert("Note Deleted Successfully!");
        setIsDeleted((p) => !p);
        setTrigger!((p) => !p);
      }
    }
  };

  return (
    <>
      <img
        className="cursor-pointer"
        onClick={() => setIsActive(!isActive)}
        src={options}
        alt="Options"
      />

      <div
        className={`absolute ${
          !isActive ? "hidden" : "block"
        } w-56 bg-theme-drop-color font-semibold text-white right-0 top-10 rounded`}
      >
        <button
          onClick={handleChangeFavoriteStatus}
          className="flex items-center py-4 w-full gap-4 cursor-pointer hover:bg-theme-notelist-hover px-4"
        >
          <img src={favoriteIcon} alt="Favorite Icon" />
          {!isFavorite ? <p>Add to Favorite</p> : <p>Add to Unfavorite</p>}
        </button>
        <button
          onClick={handleChangeArchiveStatus}
          className="flex items-center py-4 w-full gap-4 cursor-pointer border-b border-theme-light-grey hover:bg-theme-notelist-hover px-4"
        >
          <img src={archivedIcon} alt="Archived Icon" />
          {!isArchive ? <p>Add to Archive</p> : <p>Unarchive</p>}
        </button>
        <button
          onClick={() => deleteNoteFunction(noteD.id)}
          className="flex items-center py-4 w-full gap-4 cursor-pointer hover:bg-theme-notelist-hover px-4"
        >
          <img src={trashIcon} alt="Trash Icon" />
          <p>Delete</p>
        </button>
      </div>
    </>
  );
};

export default Options;
