import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const SubjectContext  = createContext({})


export const SubjectProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [subjectsData, setSubjectsData] = useState([])
    const [notesData, setNotesData] = useState([])


    const getSubjectsData = async () => {
        try {
            const response = await axios.get("/api/v1/subject/getSubjects")
            if(response.data.success){
                setSubjectsData(response.data.subjectsData)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getNotesData = async () => {
        try {
            const response = await axios.get("/api/v1/notes/getNotes");
            if(response.data.success){
                setNotesData(response.data.notesData);
                console.log("notes data response: ", response.data.notesData);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getSubjectsData()
        getNotesData()
    }, [])




    const data = {
        user, setUser,
        isCheckingAuth, setIsCheckingAuth,
        subjectsData, setSubjectsData,
        notesData, setNotesData
    }

    return (
        <SubjectContext.Provider value={data}>
           { children }
        </SubjectContext.Provider>
    )
}



export default function useStore(){
    return useContext(SubjectContext)
}