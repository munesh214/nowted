import axios from "axios";
import { Folder, Note, FetchNotesParams } from "../types/types";

const API_BASE_URL = "https://nowted-server.remotestate.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getRecentNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get("/notes/recent");
    return response.data.recentNotes;
  } catch (error) {
    console.error(error);
    throw new Error("Error in fetching the RecentNotes...");
  }
};

export const getFolders = async (): Promise<Folder[]> => {
  try {
    const response = await api.get("/folders");
    return response.data.folders;
  } catch (error) {
    console.error(error);
    throw new Error("Error in Fetching Folders...");
  }
};

export const setFolderName = async (
  folderId: string,
  newFolderName: string
): Promise<void> => {
  try {
    await api.patch(`/folders/${folderId}`, { name: newFolderName });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId: string): Promise<void> => {
  try {
    const response = await api.delete(`/folders/${folderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNoteslist = async (
  params: Partial<FetchNotesParams>
): Promise<Note[]> => {
  try {
    const response = await api.get("/notes", { params });
    return response.data.notes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNoteById = async (noteId: string): Promise<Note> => {
  try {
    const response = await api.get(`/notes/${noteId}`);
    return response.data.note;
  } catch (error) {
    console.error(error);
    throw new Error("Error in getting Notes Content...");
  }
};

export const setNote = async (note: Partial<Note>): Promise<void> => {
  try {
    await api.patch(`/notes/${note.id}`, note);
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    await api.delete(`/notes/${noteId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createNewNote = async (param: Partial<Note>): Promise<string> => {
  try {
    const response = await api.post("/notes", param);
    return response.data.id;
  } catch (error) {
    console.error(error);
    return "Error in creating Note";
  }
};

export const createNewFolder = async (folderName: string): Promise<void> => {
  try {
    await api.post("/folders", {
      name: folderName.length == 0 ? "New Folder" : folderName,
    });
  } catch (error) {
    console.error(error);
  }
};

export const restoreNote = async (noteId: string): Promise<void> => {
  try {
    await api.post(`/notes/${noteId}/restore`);
  } catch (error) {
    console.error(error);
  }
};
