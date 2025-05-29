import { AppDispatcher, Action } from './Dispatcher';
import { NavigateActionsType } from './Action';

export type State = {
    currentPath: string;
    isAuthenticated: boolean;
    email?: string;
    password?: string;
};

type Listener = (state: State) => void;

export class Store {
    private _state: State = {
        currentPath: window.location.pathname,
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
        email: 'admin@admin.com',
        password: 'admin',
    };

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
    }

    private _handleActions(action: Action): void {
        switch (action.type) {
            case NavigateActionsType.NAVIGATE:
                if (action.payload) {
                    this._state.currentPath = action.payload.path;
                    this._emitChange();
                }
                break;

            case NavigateActionsType.LOGIN:
                if (action.payload) {
                    this._state.isAuthenticated = true;
                    this._state.currentPath = action.payload.path;
                    this._emitChange();
                }
                break;

            case NavigateActionsType.REGISTER:
                if (action.payload) {
                    this._state.currentPath = action.payload.path;
                    this._state.isAuthenticated = true;
                    this._emitChange();
                }
                break;


            case NavigateActionsType.LOGOUT:
                this._state = {
                    currentPath: '/',
                    isAuthenticated: false,
                    email: this._state.email,
                    password: this._state.password
                };
                this._emitChange();
                break;
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this._state); // estado inicial
    }

    getState(): State {
        return this._state;
    }

    setState(path: string, isAuthenticated: boolean): void {
        this._state.currentPath = path;
        this._state.isAuthenticated = isAuthenticated;
        this._emitChange();
    }

    setStateWithPath(path: string): void {
        if (this._state.currentPath !== path) {
            this._state.currentPath = path;
            this._emitChange();
        } else {
            // Fuerza la emisión por si el componente necesita rerenderizarse
            this._emitChange();
        }
    }

    setStateWithAuth(isAuthenticated: boolean): void {
        this._state.isAuthenticated = isAuthenticated;
        this._emitChange();
    }

    setStateWithCredentials(email?: string, password?: string): void {
        if (email !== undefined) {
            this._state.email = email;
        }
        if (password !== undefined) {
            this._state.password = password;
        }
        this._emitChange();
    }

    private _emitChange(): void {
        this._listeners.forEach(l => l(this._state));
    }
}

export const store = new Store();