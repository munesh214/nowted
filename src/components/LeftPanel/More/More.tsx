import trash from "../../../assets/trash.png";
import favorite from "../../../assets/favorite.png";
import archived from "../../../assets/archived.png";
import { NavLink } from "react-router";

const More = () => {
  return (
    <>
      <div className="flex-none">
        <h2 className="text-sm text-theme-light-grey font-semibold pl-5">
          More
        </h2>
        <ul className="text-white text-base">
          <li>
            <NavLink
              to={`/favorite/${true}`}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-theme-recents-active" : ""
                } flex items-center gap-2 w-full h-full py-2.5 pl-5 cursor-pointer hover:bg-theme-drop-color`
              }
            >
              <img src={favorite} alt="Favorite" />
              <p>Favorite</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/trash/${true}`}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-theme-recents-active" : ""
                } flex items-center gap-2 w-full h-full py-2.5 pl-5 cursor-pointer hover:bg-theme-drop-color`
              }
            >
              <img src={trash} alt="Trash" />
              <p>Trash</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/archive/${true}`}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-theme-recents-active" : ""
                } flex items-center gap-2 w-full h-full py-2.5 pl-5 cursor-pointer hover:bg-theme-drop-color`
              }
            >
              <img src={archived} alt="Archived" />
              <p>Archived Notes</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default More;
