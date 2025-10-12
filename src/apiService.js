import axios from 'axios';

// For Create React App, client environment variables must start with REACT_APP_
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const fetchSkillsQuery = async () => {
    try {
        const url = `${apiBaseUrl.replace(/\/$/, '')}/skills`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};