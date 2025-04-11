import axios from 'axios';

export const fetchFromApi = async (url, headers = {}) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from API: ${url}`, error.message);
        throw new Error('Failed to fetch data from the API');
    }
};

export const postToApi = async (url, data, headers = {}) => {
    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error posting data to API: ${url}`, error.message);
        throw new Error('Failed to post data to the API');
    }
};