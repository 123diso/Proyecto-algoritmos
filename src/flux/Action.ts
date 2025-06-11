import { AppDispatcher, Action } from './Dispatcher';
import { store } from "./Store";
import { renderRouterView } from "../router";

export const NavigateActionsType = {
    NAVIGATE: 'NAVIGATE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    SAVE_IMAGE: 'SAVE_IMAGE',
    UNSAVE_IMAGE: 'UNSAVE_IMAGE',
    SEARCH_USER: 'SEARCH_USER',
} as const;

export type NavigateActionPayload = {
    path: string;
    email?: string;
};

export const NavigateActions = {
    saveImage: (imageUrl: string) => {
        AppDispatcher.dispatch({
            type: NavigateActionsType.SAVE_IMAGE,
            payload: { path: imageUrl },
        });
    },
    
    searchUser: (username: string) => {
        AppDispatcher.dispatch({
            type: NavigateActionsType.SEARCH_USER,
            payload: { path: username },
        });
    },

    unsaveImage: (imageUrl: string) => {
        AppDispatcher.dispatch({
            type: NavigateActionsType.UNSAVE_IMAGE,
            payload: { path: imageUrl },
        });
    },

    navigate: (path: string) => {
        const current = store.getState().currentPath;
        if (current !== path) {
            history.pushState({}, '', path);
        }

        store.setState(path, store.getState().isAuthenticated);
        renderRouterView();
        AppDispatcher.dispatch({
            type: NavigateActionsType.NAVIGATE,
            payload: { path },
        });
    },

    register: (email: string, password: string) => {
        store.setStateWithCredentials(email, password);
        store.setState('/main', true);
        localStorage.setItem('isAuthenticated', 'true');
        history.pushState({}, '', '/main');
        renderRouterView();
        AppDispatcher.dispatch({
            type: NavigateActionsType.REGISTER,
            payload: { path: '/main', email },
        });
    },

    login: () => {
        store.setState('/main',  true);
        localStorage.setItem('isAuthenticated', 'true');
        history.pushState({}, '', '/main');
        renderRouterView();
        AppDispatcher.dispatch({
            type: NavigateActionsType.LOGIN,
            payload: { path: '/main' },
        });
    },

    logout: () => {
        store.setState('/', false);
        localStorage.removeItem('isAuthenticated');
        history.pushState({}, '', '/');
        renderRouterView();
        AppDispatcher.dispatch({
            type: NavigateActionsType.LOGOUT,
        });
    },
};
