import FileUnslected from "../../../assets/fileunselected.png";

const RecentsBtn = ({ title }: { title: string }) => {
  return (
    <>
      <button className="flex items-center px-5 py-2.5 w-full gap-3 hover:bg-theme-recents-active">
        <img src={FileUnslected} alt="File Logo" className="w-5 h-5" />
        <p className="text-white font-semibold text-sm align-center">{title}</p>
      </button>
    </>
  );
};

export default RecentsBtn;
