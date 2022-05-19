import axios from "axios";
import { toast } from "react-toastify";

export const getArchives = async (token) => {
    try {
        const response = await axios.get("/api/archives", {
            headers: {
                authorization: token
            },
        });

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};


export const postArchives = async (noteId, note, authToken) => {
    console.log(noteId, note, authToken)
    try {
        const response = await axios.post(`api/notes/archives/${noteId}`,
            {
                note: note
            },
            {
                headers: { authorization: authToken },
            }
        );
        console.log(response)

        if (response.status === 200 || response.status === 201) {
            toast.success(`Note moved in Archives`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};


export const postRestoreArchives = async (noteId, authToken) => {
    try {
        const response = await axios.post(`/api/archives/restore/${noteId}`, {},
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Successfully restore form Archives`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};

export const deleteNotesInArchives = async (noteID, authToken) => {
    try {
        const response = await axios.delete(`/api/archives/delete/${noteID}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Successfully deleted form Archives`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};