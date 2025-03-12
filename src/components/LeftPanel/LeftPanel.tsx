import SearchAdd from "./SearchAdd/SearchAdd";
import Recents from "./Recents/Recents";
import Folders from "./Folders/Folders";
import More from "./More/More";

const LeftNavigation = () => {
  return (
    <>
      <SearchAdd />
      <Recents />
      <Folders />
      <More />
    </>
  );
};

export default LeftNavigation;
