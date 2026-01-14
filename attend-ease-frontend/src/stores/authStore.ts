import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState, UserRole } from '@/types';

// Mock users for each role
const mockUsersByRole: Record<UserRole, User> = {
  LAB_MEMBER: {
    id: 1,
    email: 'member@seedlabs.com',
    name: 'John Doe',
    role: 'LAB_MEMBER',
    labId: 1,
    labName: 'AI Research Lab',
    status: 'ACTIVE',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  LAB_ADMIN: {
    id: 2,
    email: 'admin@seedlabs.com',
    name: 'Jane Smith',
    role: 'LAB_ADMIN',
    labId: 1,
    labName: 'AI Research Lab',
    status: 'ACTIVE',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  SUPER_ADMIN: {
    id: 3,
    email: 'superadmin@seedlabs.com',
    name: 'Admin User',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
};

interface ExtendedAuthState extends AuthState {
  loginWithRole: (role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

// Simulated registered users storage
let registeredUsers: Record<string, { name: string; email: string; password: string; role: UserRole }> = {};

export const useAuthStore = create<ExtendedAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email?: string, _password?: string, role?: UserRole) => {
        // Allow any credentials - no validation
        const selectedRole = role || 'LAB_MEMBER';
        const user: User = {
          id: Date.now(),
          email: email || 'user@seedlabs.com',
          name: email?.split('@')[0] || 'User',
          role: selectedRole,
          labId: 1,
          labName: 'AI Research Lab',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      loginWithRole: async (role: UserRole) => {
        const user = mockUsersByRole[role];
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: async (name: string, email: string, password: string, role: UserRole) => {
        // No validation - accept any registration
        registeredUsers[email] = {
          name,
          email,
          password,
          role,
        };
        console.log('User registered:', { name, email, role });
      },

      forgotPassword: async (email: string) => {
        // No validation - just log the request
        console.log('Password reset email sent to:', email);
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth-storage');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: async () => {
        const storedState = localStorage.getItem('auth-storage');
        if (storedState) {
          try {
            const parsed = JSON.parse(storedState);
            if (parsed.state?.user && parsed.state?.isAuthenticated) {
              set({
                user: parsed.state.user,
                token: parsed.state.token,
                isAuthenticated: true,
                isLoading: false,
              });
              return;
            }
          } catch {
            // Invalid stored state
          }
        }
        set({ isLoading: false, isAuthenticated: false });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
