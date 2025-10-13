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

export const fetchExperienceQuery = async () => {
    try {
        const url = `${apiBaseUrl.replace(/\/$/, '')}/experience`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching experience:', error);
        throw error;
    }
};

export const fetchContactQuery = async () => {
    try {
        const url = `${apiBaseUrl.replace(/\/$/, '')}/contact`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching contact info:', error);
        throw error;
    }
};

export const fetchAboutQuery = async () => {
    try {
        const url = `${apiBaseUrl.replace(/\/$/, '')}/about`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching about info:', error);
        throw error;
    }
};