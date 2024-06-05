import {createContext, useContext, useState} from "react";

const LogStatusContext = createContext();
const LogStatusUpdateContext = createContext();

export function useLogStatus() {
    return useContext(LogStatusContext);
}

export function useLogStatusUpdate() {
    return useContext(LogStatusUpdateContext);
}

export function LogStatusProvider({children}) {
    const initialLogStatus = localStorage.getItem("logStatus")
    const [logStatus, setLogStatus] = useState(initialLogStatus);

    function updateLogStatus(update) {
        if(update == null) {
            localStorage.removeItem("logStatus");
        }
        else {
            localStorage.setItem("logStatus", update);
        }
        return setLogStatus(update);
    }

    return (
        <LogStatusContext.Provider value={logStatus}>
            <LogStatusUpdateContext.Provider value={updateLogStatus}>
                {children}
            </LogStatusUpdateContext.Provider>
        </LogStatusContext.Provider>
    )
}