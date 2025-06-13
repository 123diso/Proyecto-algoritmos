import { makeAutoObservable } from 'mobx';
import { AuthService } from '../service/authService';
import { User } from '../types/auth';
import {store} from "./Store";

export class AuthStore {
    user: User | null = null;
    isLoading = false;
    error: string | null = null;
    isInitialized = false;

    constructor() {
        makeAutoObservable(this);
    }

    async initializeAuth(): Promise<void> {
        if (this.isInitialized) return;

        this.isLoading = true;

        try {
            // Primero intenta cargar del localStorage
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }

            // Luego configura el listener de Firebase
            this.setupAuthListener();

            this.isInitialized = true;
        } catch (error) {
            console.error("Auth initialization error:", error);
            this.error = "Error inicializando autenticación";
        } finally {
            this.isLoading = false;
        }
    }

    private setupAuthListener() {
        return AuthService.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    // Guarda en localStorage para persistencia
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.user = user;

                    // Sincroniza con el store principal
                    store.setStateWithAuth(true);
                    store.setUserProfile(user.name || '', user.username || '', user.description || '', user.avatar || '', user.uid || '');
                } catch (error) {
                    console.error("Error updating user state:", error);
                }
            } else {
                localStorage.removeItem('currentUser');
                this.user = null;
                store.setStateWithAuth(false);
            }
        });
    }

    public static getUser(): User | null {
        return authStore.user;
    }

    private initAuthListener() {
        return AuthService.onAuthStateChanged((user) => {
            this.user = user;
        });
    }

    async register(
        email: string,
        password: string,
        username: string,
        name: string,
        description: string
    ): Promise<boolean> {
        try {
            this.setLoading(true);
            this.error = null;

            this.user = await AuthService.register(email, password, username, name, description);
            return true;
        } catch (error) {
            this.error = this.getErrorMessage(error);
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            this.setLoading(true);
            this.error = null;

            this.user = await AuthService.login(email, password);
            return true;
        } catch (error) {
            this.error = this.getErrorMessage(error);
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    async logout(): Promise<void> {
        try {
            this.setLoading(true);
            await AuthService.logout();
            this.user = null;
            this.error = null;
        } catch (error) {
            this.error = this.getErrorMessage(error);
        } finally {
            this.setLoading(false);
        }
    }

    private setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getErrorMessage(error: any): string {
        console.error("Auth error:", error);

        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    return 'El correo ya está registrado';
                case 'auth/invalid-email':
                    return 'Correo electrónico inválido';
                case 'auth/weak-password':
                    return 'La contraseña debe tener al menos 6 caracteres';
                case 'auth/user-not-found':
                    return 'Usuario no encontrado';
                case 'auth/wrong-password':
                    return 'Contraseña incorrecta';
                case 'auth/too-many-requests':
                    return 'Demasiados intentos. Intenta más tarde';
                default:
                    return error.message || 'Error de autenticación';
            }
        }
        return error.message || 'Ocurrió un error inesperado';
    }
}

export const authStore = new AuthStore();