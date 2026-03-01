import axios from "axios";
const endpoint = import.meta.env.VITE_PORT;
const port = import.meta.env.VITE_BACKEND_URL;
const baseUrl = `${endpoint}${port}`;

export const fetchUpdate = async (endpoint, setData) => {
    try {
        const res = await axios.get(`${baseUrl}/${endpoint}`);
        setData(res.data);
    } catch (err) {
        console.error(`Failed to fetch ${endpoint}`);
    }
};

export const postUpdate = async (endpoint, payload, setData, refreshEndpoint) => {
    try {
        const res =
            await axios.post(`${baseUrl}/${endpoint}`, payload);
        if (refreshEndpoint && setData) {
            await fetchUpdate(refreshEndpoint, setData);
        } return res.data;
    } catch (error) {
        console.error(`Failed to post to ${endpoint}`);
    }
}

export const patchUpdate = async (endpoint, payload, setData, refreshEndpoint) => {
    try {
        await axios.patch(`${baseUrl}/${endpoint}`, payload)
        if (refreshEndpoint && setData) {
            await fetchUpdate(refreshEndpoint, setData);
        }
    } catch (error) {
        console.error(`Failed to patch ${endpoint}`);
    }
}

export const deleteUpdate = async (endpoint, setData, refreshEndpoint) => {
    try {
        await axios.delete(`${baseUrl}/${endpoint}`)
        if (refreshEndpoint && setData) {
            await fetchUpdate(refreshEndpoint, setData);
        }
    } catch (error) {
        console.error(`Failed to delete ${endpoint}`);
    }
}