import AsyncStorage from '@react-native-async-storage/async-storage';

// ==============================================================================
// 1. CONFIGURATION (CRITICAL FOR MOBILE)
// ==============================================================================
// REPLACE '192.168.1.15' with your Computer's Local IP Address.
// If using Android Emulator, you can use '10.0.2.2'.
// If using a Real Phone, you MUST use your computer's IP (e.g., 192.168.1.XX).
const IP_ADDRESS = 'localhost'
export const API_URL = `http://${IP_ADDRESS}:8000/api`;

// ==============================================================================
// 2. AUTH HEADER HELPER (Modified for Mobile Storage)
// ==============================================================================
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      return { "Authorization": `Bearer ${token}` };
    }
  } catch (error) {
    console.error("Error reading token:", error);
  }
  return {};
};

// ==============================================================================
// 3. API OBJECT (Logic Preserved Exactly)
// ==============================================================================
export const api = {
  
  // --- AUTHENTICATION ---
  
  login: async (credentials: any) => {
    // Note: No auth headers needed for login
    const res = await fetch(`${API_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    return res.json();
  },

  // --- COURSES ---

  getCourses: async () => {
    // We must 'await' the headers now because mobile storage is async
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/`, { headers });
    if (!res.ok) throw new Error("Failed to fetch courses");
    return res.json();
  },

  getMyCourses: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/my-courses/`, { headers });
    if (!res.ok) throw new Error("Failed to fetch my courses");
    return res.json();
  },

  getCourseDetails: async (id: string) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/${id}/full/`, { headers });
    if (!res.ok) throw new Error("Failed to load course content");
    return res.json();
  },

  // --- DASHBOARD & PROGRESS ---

  getMonitorDashboard: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/monitor/dashboard/`, { headers });
    if (!res.ok) throw new Error("Failed to fetch monitor dashboard");
    return res.json();
  },

  markLessonComplete: async (lessonId: number) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/lessons/${lessonId}/complete/`, {
      method: "POST",
      headers,
    });
    if (!res.ok) throw new Error("Failed to update progress");
    return res.json();
  },

  // --- ENROLLMENT ---

  enrollCourse: async (courseId: number) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/${courseId}/enroll/`, {
      method: "POST",
      headers,
    });
    if (!res.ok) throw new Error("Enrollment failed");
    return res.json();
  },

  manageEnrollment: async (enrollmentId: number, action: 'approve' | 'reject') => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/courses/enrollment/${enrollmentId}/manage/`, {
      method: "POST",
      // We merge the Auth headers with the Content-Type header
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) throw new Error("Action failed");
    return res.json();
  }
};
