import Search from "../../../assets/search.png";
import { useState, useEffect } from "react";
import { getNoteslist } from "../../../services/api";
import { Note } from "../../../types/types";
import { NavLink } from "react-router";

const Searchbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      const data = await getNoteslist({
        archived: false,
        deleted: false,
        search: searchTerm,
      });
      setSuggestions(data);
      setLoading(false);
    };

    // Debounce API calls
    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      {/* Search Box */}
      <div className="w-full flex items-center bg-theme-unselect p-2.5 gap-2">
        <img src={Search} alt="Search Icon" />
        <input
          className="w-full text-theme-light-grey border-none outline-none"
          placeholder="Search Note"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable Dropdown List */}
      {searchTerm && (
        <ul className="absolute left-0 w-full mt-1 bg-theme-light-black text-white rounded shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : suggestions.length === 0 ? (
            <li className="p-3 text-gray-400">No note found</li>
          ) : (
            suggestions.map((item, index) => (
              <NavLink to={`/${item.folder.name}/${item.folder.id}/${item.id}`}>
                <li
                  key={index}
                  className="p-3 cursor-pointer hover:bg-theme-drop-color"
                >
                  {item.title}
                </li>
              </NavLink>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbox;
