const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('adminToken');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => apiRequest('/projects'),
  getOne: async (id: string) => apiRequest(`/projects/${id}`),
  create: async (data: any) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: any) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Skills API
export const skillsAPI = {
  getAll: async () => apiRequest('/skills'),
  create: async (data: any) => apiRequest('/skills', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: any) => apiRequest(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/skills/${id}`, {
    method: 'DELETE',
  }),
};

// About API
export const aboutAPI = {
  get: async () => apiRequest('/about'),
  update: async (data: any) => apiRequest('/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Education API
export const educationAPI = {
  getAll: async () => apiRequest('/education'),
  create: async (data: any) => apiRequest('/education', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: any) => apiRequest(`/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/education/${id}`, {
    method: 'DELETE',
  }),
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getToken();
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    return data;
  },
};
