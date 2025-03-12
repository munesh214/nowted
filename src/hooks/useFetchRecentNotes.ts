import { useState, useEffect } from "react";
import { Note } from "../types/types";
import { getRecentNotes } from "../services/api";

const useFetchRecentNotes = () => {
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getRecentNotes();
        setRecentNotes(data);
      } catch {
        setError("Error in Fetching Recent Notes...");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { recentNotes, loading, error };
};

export default useFetchRecentNotes;
