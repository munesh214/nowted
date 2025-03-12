import { useNavigate, useParams } from "react-router";
import restoreLogo from "../../assets/restore.png";
import { useContext, useEffect, useState } from "react";
import { getNoteById, restoreNote } from "../../services/api";
import { Note } from "../../types/types";
import { TriggerNotesListContext } from "../../context/TriggerNotesListContext";

const Restore = ({
  setIsDeleted,
}: {
  setIsDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { noteId, isTrash } = useParams();
  const [noteData, setNoteData] = useState<Note>();
  const navigate = useNavigate();
  const { setTrigger } = useContext(TriggerNotesListContext);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteById(noteId!);
      setNoteData(data);
    };
    fetchNote();
  }, [noteId]);

  const handleRestoreNote = async () => {
    await restoreNote(noteId!);
    alert("Note Restored Successfull!");
    if (!isTrash) {
      setIsDeleted!((p) => !p);
      setTrigger!((p) => !p);
    }

    navigate(`/${noteData!.folder.name}/${noteData!.folderId}/${noteData!.id}`);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center p-24">
        <div className="flex flex-col gap-3 items-center justify-center">
          <img src={restoreLogo} alt="File Logo" />
          <h2 className="text-white font-bold text-2xl text-center">
            Restore “{noteData?.title}”
          </h2>
          <p className="text-center text-sm text-theme-light-grey font-medium">
            Don't want to lose this note? It's not too late! Just click the
            'Restore' button and it will be added back to your list. It's that
            simple.
          </p>
          <button
            onClick={handleRestoreNote}
            className="px-7 py-1.5 cursor-pointer hover:bg-white hover:text-black bg-theme-recents-active rounded-md text-white"
          >
            Restore
          </button>
        </div>
      </div>
    </>
  );
};

export default Restore;
