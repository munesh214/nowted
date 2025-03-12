import { useState, useRef, useEffect, useContext } from "react";
import folderInactive from "../../../assets/folder.png";
import folderActive from "../../../assets/folderactive.png";
import axios from "axios";
import Delete from "./Delete";
import { NavLink, useParams } from "react-router";
import { FoldersBtnProps } from "../../../types/types";
import { TriggerNotesListContext } from "../../../context/TriggerNotesListContext";

const FoldersBtn = ({
  title,
  id,
  isActive,
  setIsActive,
  refetch,
}: FoldersBtnProps) => {
  const { folderId } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTrigger } = useContext(TriggerNotesListContext);

  useEffect(() => {
    setIsActive(folderId!);
  }, [folderId, setIsActive]);

  const handleAdd = async () => {
    await axios.patch(`https://nowted-server.remotestate.com/folders/${id}`, {
      name: buttonText,
    });
    setTrigger!((p) => !p);
  };

  const handleSingleClick = () => {
    setIsActive(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlurOrEnter = () => {
    handleAdd();
    setIsEditing(false);
  };

  return (
    <div className="text-sm cursor-pointer">
      <NavLink to={`/${title}/${id}`}>
        {isEditing ? (
          <div className="py-2.5 px-5 w-full flex items-center gap-2">
            <img src={isActive ? folderActive : folderInactive} alt="Folder" />
            <input
              ref={inputRef}
              type="text"
              className="border-none outline-none w-full bg-white"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              onBlur={handleBlurOrEnter}
              onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
            />
          </div>
        ) : (
          <button
            onClick={handleSingleClick}
            onDoubleClick={handleDoubleClick}
            className={`py-2.5 px-5 w-full flex items-center justify-between hover:bg-theme-drop-color text-white ${
              isActive ? "bg-theme-recents-active" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={isActive ? folderActive : folderInactive}
                alt="Folder"
              />
              <p>{buttonText}</p>
            </div>
            <Delete id={id} refetch={refetch} />
          </button>
        )}
      </NavLink>
    </div>
  );
};

export default FoldersBtn;
