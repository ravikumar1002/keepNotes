
import axios from "axios";
import { toast } from "react-toastify";

export const getNotes = async (token) => {
    try {
        const response = await axios.get("/api/notes", {
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


export const postNotes = async (note, authToken) => {
    try {
        const response = await axios.post(`/api/notes`, {
            note: note
        },
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Note created`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};


export const updateNotes = async (updatedNote, updatedNoteId, authToken) => {
    try {
        const response = await axios.post(`/api/notes/${updatedNoteId}`, {
            note: updatedNote
        },
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Note updated`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};


export const deleteNotes = async (notesId, authToken) => {
    try {
        const response = await axios.delete(`/api/notes/${notesId}`,
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success(`Note deleted`);
            return response.data
        }
    } catch (error) {
        toast.error(`Something went wrong`);
        console.log(error);
        throw error
    }
};
