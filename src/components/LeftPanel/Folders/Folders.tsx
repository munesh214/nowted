import foldercreate from "../../../assets/foldercreate.png";
import FoldersBtn from "./FoldersBtn";
import useFetchFolders from "../../../hooks/useFetchFolders";
import { useState, useRef, useEffect } from "react";
import folderInActive from "../../../assets/folder.png";
import { useNavigate, useParams } from "react-router";
import { createNewFolder } from "../../../services/api";

const Folders = () => {
  const { noteId, folderId, isFavorite, isArchive, isTrash } = useParams();
  const navigate = useNavigate();
  const { folders, loading, error, refetch } = useFetchFolders(); // Using refetch
  const [showInput, setShowInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (
      folders.length > 0 &&
      noteId === undefined &&
      folderId === undefined &&
      isFavorite == undefined &&
      isArchive == undefined &&
      isTrash == undefined
    ) {
      navigate(`/${folders[0].name}/${folders[0].id}`);
    }
  }, [folderId, noteId, folders, isFavorite, isArchive, isTrash, navigate]);

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newFolderName.trim()) {
      await createNewFolder(newFolderName);
      setShowInput(false);
      setNewFolderName("");
      refetch();
      // navigate(`/${newFolder}`);
    }
  };

  if (loading)
    return <p className="text-white pl-5 font-semibold">Loading Folders...</p>;
  if (error) return <p className="text-white pl-5 font-semibold">{error}</p>;

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-theme-light-grey pl-5 font-semibold">
          Folders
        </h2>
        <img
          src={foldercreate}
          alt="Create Folder Icon"
          className="pr-5 cursor-pointer"
          onClick={() => setShowInput(true)}
        />
      </div>

      <ul className="overflow-y-auto flex flex-col h-full gap-2">
        {/* New folder input at the top */}
        {showInput && (
          <li className="pt-2.5 px-5 pb-1.5 w-full flex gap-3 items-center text-sm">
            <img src={folderInActive} alt="Folder Close Image" />
            <input
              ref={inputRef}
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={handleKeyPress} // Handle folder creation on Enter
              autoFocus
              placeholder="New Folder Name"
              className="text-white bg-transparent outline-none border-b border-theme-light-grey"
            />
          </li>
        )}

        {/* Display the list of folders */}
        {folders.map((folder) => (
          <li key={folder.id}>
            <FoldersBtn
              title={folder.name}
              id={folder.id}
              isActive={activeFolderId === folder.id}
              setIsActive={setActiveFolderId}
              refetch={refetch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Folders;
