import { createContext, useContext, useState } from "react";

// Create the context
const ContextData = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const clearData = ()=>{
        setData([])
    }

    return (
        <ContextData.Provider value={{ data, setData ,clearData}}>
            {children}
        </ContextData.Provider>
    );
};

// Custom hook to use the context
const useContextData = () => useContext(ContextData);

export { ContextProvider, useContextData };
