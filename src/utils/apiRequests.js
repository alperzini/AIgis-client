import axios from "axios";

// Single base URL from .env
// In client/.env: VITE_API_BASE_URL=http://localhost:8080
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

console.log("API BASE URL >>>", baseUrl);

export const fetchUpdate = async (endpointPath, setData) => {
  try {
    const res = await axios.get(`${baseUrl}/${endpointPath}`);
    console.log(`RAW RESPONSE (${endpointPath}) >>>`, res.data);
    setData(res.data);
  } catch (err) {
    console.error(`Failed to fetch ${endpointPath}`, err);
  }
};

export const postUpdate = async (
  endpointPath,
  payload,
  setData,
  refreshEndpoint
) => {
  try {
    const res = await axios.post(`${baseUrl}/${endpointPath}`, payload);
    if (refreshEndpoint && setData) {
      await fetchUpdate(refreshEndpoint, setData);
    }
    return res.data;
  } catch (error) {
    console.error(`Failed to post to ${endpointPath}`, error);
  }
};

export const patchUpdate = async (
  endpointPath,
  payload,
  setData,
  refreshEndpoint
) => {
  try {
    await axios.patch(`${baseUrl}/${endpointPath}`, payload);
    if (refreshEndpoint && setData) {
      await fetchUpdate(refreshEndpoint, setData);
    }
  } catch (error) {
    console.error(`Failed to patch ${endpointPath}`, error);
  }
};

export const deleteUpdate = async (
  endpointPath,
  setData,
  refreshEndpoint
) => {
  try {
    await axios.delete(`${baseUrl}/${endpointPath}`);
    if (refreshEndpoint && setData) {
      await fetchUpdate(refreshEndpoint, setData);
    }
  } catch (error) {
    console.error(`Failed to delete ${endpointPath}`, error);
  }
};