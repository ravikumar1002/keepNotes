
import axios from "axios";

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
    console.log(note, authToken)
    try {
        const response = await axios.post(`/api/notes`, {
            note: note
        },
            {
                headers: { authorization: authToken },
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
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
            return response.data
        }
    } catch (error) {
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
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};
