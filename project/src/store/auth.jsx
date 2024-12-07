import { createContext, useContext,useEffect,useState } from "react";
import { baseurl } from "../Config/config";


export const Authcontext = createContext();

export const Authprovider = ({children}) => {

    const storetoken = () => {
        return localStorage.getItem('token')
    }

    const [data, setData] = useState(null); // Initialize as null or empty object
    const [error, setError] = useState(null);
    const [isLoadind,setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await fetch(`${baseurl}/singleuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });
    
                if (!response.ok) throw new Error('Network response was not ok');
    
                const result = await response.json();
                console.log("API Result:", result); // Log to check data structure
                
                // Check if `message` exists in result
                if (result && result.message) {
                    setData(result.message); 
                    setLoading(false)// Set data to `message` object
                } else {
                    setError("No data found in response"); // Set error if `message` is missing
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message); // Update error state
            }
        };
    
        fetchData();
    }, []);
    return <Authcontext.Provider value={{storetoken,data,isLoadind}} >
        {children} 
    </Authcontext.Provider>

}
export const useAuth = () => {
    const authvalue = useContext(Authcontext);
    if(!authvalue){
        throw new Error ('error')
    }
    return authvalue;
};