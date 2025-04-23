const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Empty string means same domain in production
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  DOCTORS: `${API_BASE_URL}/api/doctors`,
  DOCTOR_LOGIN: `${API_BASE_URL}/api/doctors/login`,
  DOCTOR_SIGNUP: `${API_BASE_URL}/api/doctors/signup`,
  USERS: `${API_BASE_URL}/api/users`,
  APPOINTMENTS: `${API_BASE_URL}/api/appointments`,
};

export default API_ENDPOINTS;
