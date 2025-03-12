import { useParams } from "react-router";
import NoteItem from "./NoteItem";
import { useContext, useEffect, useState } from "react";
import { Note } from "../../types/types";
import { NavLink } from "react-router";
import { getNoteslist } from "../../services/api";
import { TriggerNotesListContext } from "../../context/TriggerNotesListContext";
import { FetchNotesParams } from "../../types/types";

const NotesPanel = () => {
  const { folderId, folderName, isFavorite, isArchive, isTrash } = useParams();
  const [heading, setHeading] = useState<string>("");
  const [noteLists, setNoteLists] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const context = useContext(TriggerNotesListContext);

  useEffect(() => {
    // Reset state when folder or filters change
    setNoteLists([]);
    setPage(1);
    setHasMore(true);
  }, [folderId, isFavorite, isArchive, isTrash, context.trigger]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);


      const params: FetchNotesParams = { limit: 10, page };
      if (isFavorite) params.favorite = true;
      if (isArchive) params.archived = true;
      if (isTrash) params.deleted = true;
      if (folderId) params.folderId = folderId;

      const data = (isFavorite || isArchive || isTrash || folderId) ? await getNoteslist(params) : [];

      setNoteLists((prev) => (page === 1 ? data : [...prev, ...data]));
      setHeading(data.length > 0 ? data[0].folder.name : "");
      setHasMore(data.length === 10);
      setLoading(false);
    };

    fetchNotes();
  }, [page, folderId, isFavorite, isArchive, isTrash, context.trigger]);

  return (
    <>
      <div className="text-white px-5 py-7 flex flex-col gap-4 h-screen">
        <h2 className="font-semibold text-2xl flex-none">
          {isFavorite
            ? "Favorite Notes"
            : isArchive
              ? "Archive Notes"
              : isTrash
                ? "Trash Notes"
                : heading.length === 0 ? folderName! : heading}
        </h2>
        <ul className="flex flex-col gap-4 overflow-y-auto">
          {noteLists.map((i) => (
            <li key={i.id}>
              <NavLink
                to={
                  isTrash
                    ? `/trash/true/${i.id}`
                    : isFavorite
                      ? `/favorite/true/${i.id}`
                      : isArchive
                        ? `/archive/true/${i.id}`
                        : `/${i.folder.name}/${i.folderId}/${i.id}`
                }
                className={({ isActive }) =>
                  `${isActive ? "bg-theme-notelist-hover" : "bg-theme-unselect"
                  }  w-full p-3.5 text-sm flex flex-col gap-2 hover:bg-theme-notelist-hover cursor-pointer`
                }
              >
                <NoteItem
                  noteId={i.id}
                  title={i.title}
                  createdAt={i.createdAt}
                  preview={i.preview}
                />
              </NavLink>
            </li>
          ))}
        </ul>

        {hasMore && noteLists.length >= 10 && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mt-4 self-center"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};

export default NotesPanel;

