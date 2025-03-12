import { useEffect, useState } from "react";
import { getFolders } from "../../services/api"; // Import your API function
import { setNote } from "../../services/api";
import { useNavigate } from "react-router";


interface Folder {
    id: string;
    name: string;
}

const FolderChangeDropbox = ({ folderName, noteId }: { folderName: string | undefined, noteId: string | undefined }) => {
    const navigate = useNavigate()
    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolderName, setSelectedFolderName] = useState<string>(folderName!);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedFolderName(folderName!)

    }, [folderName]

    )
    const fetchFolders = async () => {
        if (folders.length > 0) {
            setIsOpen(!isOpen);
            return;
        }

        setIsLoading(true);
        const data = await getFolders(); // API call from api.ts
        setFolders(data);
        setIsOpen(true);
        setIsLoading(false);
    };

    const updateFolder = async (noteId: string, folderId: string, folderNewName: string) => {
        await setNote({ id: noteId, folderId })
        navigate(`/${folderNewName}/${folderId}/${noteId}`);
    }

    return (
        <div className="relative cursor-pointer">
            {/* Click to fetch folders and toggle dropdown */}
            <p
                className="cursor-pointer p-2"
                onClick={fetchFolders}
            >
                {selectedFolderName}
            </p>

            {/* Dropdown menu */}
            {isOpen && (
                <ul className="absolute mt-2 w-48 border rounded bg-theme-drop-color shadow-lg max-h-52 overflow-y-auto">
                    {isLoading ? (
                        <li className="p-2 text-gray-500">Loading...</li>
                    ) : folders.length > 0 ? (
                        folders.map(folder => (
                            <li key={folder.id} onClick={() => {
                                updateFolder(noteId!, folder.id, folder.name)
                                setSelectedFolderName(folder.name)
                            }} className="p-2 hover:bg-theme-recents-active cursor-pointer">
                                {folder.name}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No folders found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FolderChangeDropbox;
