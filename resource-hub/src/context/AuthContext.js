import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

const DEMO_STUDENT = {
  id: 'usr-student-1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@ece.edu',
  rollNo: '22ECE104',
  semester: 5,
  department: 'Electronics & Communication Engineering',
  role: 'Student',
  avatar: 'AS',
  joinedDate: '2023-08-15',
  contributionsCount: 3,
};

const DEMO_FACULTY = {
  id: 'usr-faculty-1',
  name: 'Dr. Preeti Iyer',
  email: 'preeti.iyer@ece.edu',
  rollNo: 'FAC-EC-08',
  semester: 'All',
  department: 'Electronics & Communication Engineering',
  role: 'Faculty Lead',
  avatar: 'PI',
  joinedDate: '2019-06-10',
  contributionsCount: 14,
};

export function AuthProvider({ children }) {
  // Store user in localStorage (defaults to demo student so app starts with a friendly active state)
  const [user, setUser] = useLocalStorage('ece_portal_auth_user', DEMO_STUDENT);

  const login = useCallback((credentials) => {
    const { email, role, rollNo, name } = credentials;

    // Check if matching faculty or student
    let loggedInUser;
    if (role === 'Faculty' || (email && email.includes('faculty'))) {
      loggedInUser = {
        ...DEMO_FACULTY,
        email: email || DEMO_FACULTY.email,
        name: name || DEMO_FACULTY.name,
      };
    } else {
      loggedInUser = {
        id: `usr-${Date.now()}`,
        name: name || (email ? email.split('@')[0] : 'ECE Student'),
        email: email || 'student@ece.edu',
        rollNo: rollNo || '23ECE042',
        semester: credentials.semester || 4,
        department: 'Electronics & Communication Engineering',
        role: 'Student',
        avatar: (name || email || 'ST').substring(0, 2).toUpperCase(),
        joinedDate: new Date().toISOString().split('T')[0],
        contributionsCount: 1,
      };
    }

    setUser(loggedInUser);
    return loggedInUser;
  }, [setUser]);

  const loginAsDemo = useCallback((type = 'student') => {
    if (type === 'faculty') {
      setUser(DEMO_FACULTY);
      return DEMO_FACULTY;
    } else {
      setUser(DEMO_STUDENT);
      return DEMO_STUDENT;
    }
  }, [setUser]);

  const register = useCallback((userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      rollNo: userData.rollNo,
      semester: Number(userData.semester) || 1,
      department: 'Electronics & Communication Engineering',
      role: userData.role || 'Student',
      avatar: userData.name ? userData.name.substring(0, 2).toUpperCase() : 'EC',
      joinedDate: new Date().toISOString().split('T')[0],
      contributionsCount: 0,
    };
    setUser(newUser);
    return newUser;
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const updateProfile = useCallback((updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
