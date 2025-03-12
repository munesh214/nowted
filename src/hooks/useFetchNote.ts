import { useState, useEffect } from "react";
import { Note } from "../types/types";
import { getNoteById } from "../services/api";

const useFetchNote = (noteId: string) => {
  const [note, setNote] = useState<Note>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;

      setLoading(true);
      try {
        const data = await getNoteById(noteId);
        setNote(data);
      } catch {
        setError("Error fetching note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  return { note, loading, error };
};

export default useFetchNote;

// export default useFetchNote;
