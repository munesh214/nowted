import { useState, useEffect } from "react";
import { Folder } from "../types/types";
import { getFolders } from "../services/api";

const useFetchFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const data = await getFolders();
      setFolders(data);
    } catch {
      setError("Error in fetching folders");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchFolders();
  }, []);

  // Return the refetch function so it can be used outside this hook
  return { folders, loading, error, refetch: fetchFolders };
};

export default useFetchFolders;
