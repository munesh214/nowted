import { useNavigate } from "react-router";
import deleteImage from "../../../assets/trash.png";
import { deleteFolder } from "../../../services/api";


const Delete = ({
  id,
  refetch,
}: {
  id: string;
  refetch: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (confirm(`Are You sure you want to delete this folder?`)) {
      await deleteFolder(id);
      alert("Folder Deleted Successfull!");
      await refetch();
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <img onClick={handleClick} src={deleteImage} alt="Delete Image" />
      </div>
    </>
  );
};

export default Delete;
