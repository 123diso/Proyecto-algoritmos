// types/auth.ts
export interface User {
    uid: string;
    email: string | null;
    password?: string;
    username?: string;
    name?: string | null;
    displayName?: string | undefined;
    description?: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}