import { store } from './flux/Store';
import './Component/postsett/postsett';

export const routes: Record<string, { component: string; protected: boolean }> = {
    '/': { component: 'login-component', protected: false },
    '/main': { component: 'main-page', protected: true },
    '/profile': { component: 'profile-component', protected: true },
    '/notification': { component: 'notification-page', protected: true },
    '/create': { component: 'postsett-component', protected: true },
    '/saved': { component: 'saved-component', protected: true },
    '/configuration': { component: 'configuration-element', protected: true },
    '/register': { component: 'register-component', protected: false },
};

export function renderRouterView() {
    const { currentPath, isAuthenticated } = store.getState();
    const route = routes[currentPath];
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    if (!route) {
        app.innerText = '404 - Página no encontrada';
        return;
    }

    if (route.protected && !isAuthenticated) {
        if (currentPath !== '/') {
            history.replaceState({}, '', '/');
            store.setStateWithPath('/');
            return; 
        }

        const loginElement = document.createElement('login-component');
        app.appendChild(loginElement);
        return;
    }

    const element = document.createElement(route.component);
    app.appendChild(element);
}

