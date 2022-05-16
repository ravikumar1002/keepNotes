import axios from "axios";


export const getUserData = async (token) => {
    console.log(token, "pro")
    try {
        const response = await axios.get("/api/user", {
            headers: {
                authorization: token
            },
        });
        console.log(response)

        if (response.status === 200 || response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};