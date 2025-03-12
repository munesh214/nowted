import RecentsBtn from "./RecentsBtn";
import useFetchRecentNotes from "../../../hooks/useFetchRecentNotes";
import { Link } from "react-router";

const Recents = () => {
  const { recentNotes, loading, error } = useFetchRecentNotes();

  if (loading)
    return <p className="text-white pl-5 font-semibold">Loading...</p>;
  if (error) return <p className="text-white pl-5">{error}</p>;

  return (
    <>
      <div className="flex-none">
        <h2 className="text-sm text-theme-light-grey pl-5 font-semibold">
          Recents
        </h2>
        <ul className="flex flex-col gap-1">
          {recentNotes.map((item) => (
            <li key={item.id}>
              <Link to={`/${item.folder.name}/${item.folder.id}/${item.id}`}>
                <RecentsBtn title={item.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Recents;
