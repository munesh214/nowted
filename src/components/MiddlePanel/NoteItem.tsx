const NoteItem = ({
  title,
  createdAt,
  preview,
}: {
  noteId: string;
  title: string;
  createdAt: string;
  preview: string | undefined;
}) => {
  return (
    <>
      {/* <div className={`w-full p-3.5 text-sm flex flex-col gap-2  bg-theme-unselect hover:bg-theme-notelist-hover cursor-pointer`}> */}
      <h3 className="font-semibold">{title}</h3>
      <div className="flex items-center justify-between font-extralight text-xs">
        <p>{createdAt.slice(0, 10)}</p>
        <p>{`${preview?.slice(0, 30)}...`}</p>
      </div>
      {/* </div> */}
    </>
  );
};

export default NoteItem;
