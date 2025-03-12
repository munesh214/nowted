import { createContext,useState } from "react";
import { TriggerNotesListInterface } from "../types/types";

const TriggerNotesListContext = createContext<TriggerNotesListInterface>({});

const TriggerNotesListProvider = ({ children }: { children: React.ReactNode }) => {
    const [trigger, setTrigger] = useState<boolean>(true);
    
    return (
        <TriggerNotesListContext.Provider value={{ trigger, setTrigger }}>
            {children}
        </TriggerNotesListContext.Provider>
    );
};

export {TriggerNotesListContext,TriggerNotesListProvider}