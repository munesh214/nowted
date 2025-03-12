import LeftNavigation from "./components/LeftPanel/LeftPanel";
import NotesPanel from "./components/MiddlePanel/NotesPanel";  
import { TriggerNotesListProvider } from "./context/TriggerNotesListContext";
import RightPanel from "./components/RightPanel/RightPanel";

function App() {

  return (
    <>
      <TriggerNotesListProvider>
        <main className="w-full min-h-screen flex">
          <aside className="flex flex-col gap-7 bg-theme-dark w-7/32 h-screen">
            <LeftNavigation />
          </aside>

          <div className="bg-theme-light-black w-8/32 h-screen">
            <NotesPanel />
          </div>

          <div className="bg-theme-dark w-17/32 h-screen">
            <RightPanel />
          </div>
        </main>
      </TriggerNotesListProvider>
    </>
  );
}

export default App;
