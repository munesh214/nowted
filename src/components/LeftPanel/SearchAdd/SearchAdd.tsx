import Logo from "../../../assets/nowted-logo.png";
import Search from "../../../assets/search.png";
import close from "../../../assets/close.png";
import Plus from "../../../assets/plus.png";

import Searchbox from "./Searchbox";

import { useNavigate, useParams, NavLink } from "react-router";
import { createNewNote } from "../../../services/api";
import { useContext, useState } from "react";
import { TriggerNotesListContext } from "../../../context/TriggerNotesListContext";

const SearchAdd = () => {
  const { folderId, folderName } = useParams();
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const { setTrigger } = useContext(TriggerNotesListContext);

  const handleCreateNewNote = async () => {
    if (folderId === undefined) {
      alert("Please Select the Folder where you want to create the Note!");
      return;
    }

    const newNoteId = await createNewNote({
      folderId,
      title: "New Note",
      content: "",
      isFavorite: false,
      isArchived: false,
    });
    setTrigger!((p) => !p);
    navigate(`/${folderName}/${folderId}/${newNoteId}`);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-5 pb-0 flex-none">
        <div className="flex w-full items-center justify-between">
          <NavLink to="/">
            <img src={Logo} alt="Nowted Logo" />
          </NavLink>

          <img
            className="cursor-pointer"
            onClick={() => setIsSearchActive((p) => !p)}
            src={!isSearchActive ? Search : close}
            alt="Search Logo"
          />
        </div>
        {!isSearchActive ? (
          <button
            onClick={() => handleCreateNewNote()}
            className="flex items-center justify-center text-white p-4 cursor-pointer hover:bg-theme-notelist-hover bg-theme-unselect"
          >
            <div className="flex items-center gap-2">
              <img src={Plus} alt="Plus Logo" className="h-3.5 w-3.5" />
              <p className="text-sm leading-none font-semibold flex items-center">
                New Note
              </p>
            </div>
          </button>
        ) : (
          <Searchbox />
        )}
      </div>
    </>
  );
};

export default SearchAdd;
