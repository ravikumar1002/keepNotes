import axios from "axios";
import { toast } from "react-toastify";

export const getTrash = async (token) => {
    try {
        const response = await axios.get("/api/trash", {
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


export const postTrash = async (noteId, authToken) => {
    try {
        const response = await axios.post(`api/notes/trash/${noteId}`,{},
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Note moved in Bin`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};


export const postRestoreTrash = async (noteId, authToken) => {
    try {
        const response = await axios.post(`/api/trash/restore/${noteId}`,{},
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Successfully restore form Bin`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};

export const deleteNotesInTrash = async (noteID, authToken) => {
    try {
        const response = await axios.delete(`/api/trash/delete/${noteID}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Successfully deleted form Bin`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};