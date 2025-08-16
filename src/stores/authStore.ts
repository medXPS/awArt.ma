import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../data/mockData';

export type UserRole = 'customer' | 'artist' | 'admin';

export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'not_submitted';

export interface KYCData {
  identityDocument?: string;
  faceVerification?: string;
  status: KYCStatus;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  kyc?: KYCData;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'emailVerified' | 'phoneVerified' | 'createdAt'> & { password: string }) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  submitKYC: (kycData: Omit<KYCData, 'status' | 'submittedAt'>) => void;
  updateKYCStatus: (userId: string, status: KYCStatus, rejectionReason?: string) => void;
  verifyEmail: (userId: string) => void;
  verifyPhone: (userId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (userData) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          emailVerified: false,
          phoneVerified: false,
          createdAt: new Date().toISOString(),
          kyc: userData.role === 'artist' ? {
            status: 'not_submitted'
          } : undefined,
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      updateProfile: (updates) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },
      submitKYC: (kycData) => {
        set(state => ({
          user: state.user ? {
            ...state.user,
            kyc: {
              ...kycData,
              status: 'pending',
              submittedAt: new Date().toISOString(),
            }
          } : null
        }));
      },
      updateKYCStatus: (userId, status, rejectionReason) => {
        set(state => ({
          user: state.user && state.user.id === userId ? {
            ...state.user,
            kyc: state.user.kyc ? {
              ...state.user.kyc,
              status,
              reviewedAt: new Date().toISOString(),
              rejectionReason,
            } : undefined
          } : state.user
        }));
      },
      verifyEmail: (userId) => {
        set(state => ({
          user: state.user && state.user.id === userId ? {
            ...state.user,
            emailVerified: true,
          } : state.user
        }));
      },
      verifyPhone: (userId) => {
        set(state => ({
          user: state.user && state.user.id === userId ? {
            ...state.user,
            phoneVerified: true,
          } : state.user
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);