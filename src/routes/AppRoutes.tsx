import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>

        <Route path="/:folderName/:folderId" element={<App />} />
        <Route path="/:folderName/:folderId/:noteId" element={<App />} />

        <Route path="/favorite/:isFavorite" element={<App />} />
        <Route path="/favorite/:isFavorite/:noteId" element={<App />} />

        <Route path="/archive/:isArchive" element={<App />} />
        <Route path="/archive/:isArchive/:noteId" element={<App />} />

        <Route path="/trash/:isTrash" element={<App />} />
        <Route path="/trash/:isTrash/:noteId" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
