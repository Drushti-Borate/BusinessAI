import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const uploadService = {
  uploadCSV: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Backend returned an error response
        throw new Error(error.response.data.detail || 'An error occurred during upload.');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Network error. Is the backend server running?');
      } else {
        // Something happened in setting up the request
        throw new Error('An unexpected error occurred.');
      }
    }
  }
};
