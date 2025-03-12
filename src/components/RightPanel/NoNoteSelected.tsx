import fileLogo from "../../assets/file.png";
const NoNoteSelected = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center p-30">
        <div className="flex flex-col gap-3 items-center justify-center">
          <img src={fileLogo} alt="File Logo" />
          <h2 className="text-white font-bold text-2xl text-center">
            Select a note to view
          </h2>
          <p className="text-center text-sm text-theme-light-grey font-medium">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoNoteSelected;
