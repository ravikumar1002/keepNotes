import axios from "axios";

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
    console.log(noteId, authToken)
    try {
        const response = await axios.post(`api/notes/trash/${noteId}`,{},
            {
                headers: { authorization: authToken },
            }
        );
        console.log(response)

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
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
            return response.data
        }
    } catch (error) {
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
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};