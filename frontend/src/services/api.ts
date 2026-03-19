const API_BASE_URL = 'http://localhost:5000/api';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: string;
  isCompleted: boolean;
  createdAt: string;
}

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const mapTask = (task: any): Task => ({
  ...task,
  isCompleted: task.status === 'COMPLETED',
});

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token === 'guest-mode-token') {
      return [
        { id: '1', title: 'Welcome to Bread & Butter', description: 'This is a sample task in Pending.', priority: 'MEDIUM', status: 'PENDING', isCompleted: false, createdAt: new Date().toISOString() },
        { id: '2', title: 'Getting Started', description: 'You can move tasks between columns or edit details.', priority: 'HIGH', status: 'IN_PROGRESS', isCompleted: false, createdAt: new Date().toISOString() },
      ];
    }
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: getAuthHeaders(),
    });
    if (response.status === 401) {
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const tasks = await response.json();
    return tasks.map(mapTask);
  },

  createTask: async (data: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (response.status === 401) {
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to create task');
    return mapTask(await response.json());
  },

  updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (response.status === 401) {
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to update task');
    return mapTask(await response.json());
  },

  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (response.status === 401) {
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to delete task');
  },

  toggleTask: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (response.status === 401) {
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('Failed to toggle task');
    return mapTask(await response.json());
  },
};

export const authApi = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Login failed');
        }
        const data = await response.json();
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },
    register: async (email: string, password: string, name?: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Registration failed');
        }
        return response.json();
    },
    resetPassword: async (email: string, newPassword: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Password reset failed');
        }
        return response.json();
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
        }
    }
};
