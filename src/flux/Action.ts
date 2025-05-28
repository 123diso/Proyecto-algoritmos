import { PostData } from '../Component/start/postcard/postcard';
import { AppDispatcher } from './Dispatcher';

export const NavigateActionsType = {
NAVIGATE: 'NAVIGATE',
LOGIN: 'LOGIN'
} as const;

export const NavigateActions = {
navigate: (path: string) => {
    AppDispatcher.dispatch({
    type: NavigateActionsType.NAVIGATE,
    payload: { path },
    });
},

logout: () => {
    localStorage.setItem('isLoggedIn', 'false');
    AppDispatcher.dispatch({
    type: NavigateActionsType.NAVIGATE,
    payload: { path: '/' },
    });
},

login: () => {
    localStorage.setItem('isLoggedIn', 'true');
    AppDispatcher.dispatch({
    type: NavigateActionsType.LOGIN,
    payload: { path: '/main' },
    });
}

};

export const PostActionsTypes = {
PUBLISH: 'PUBLISH',
} as const;

export const PostActions = {
publish: (post: PostData) => {
    AppDispatcher.dispatch({
    type: PostActionsTypes.PUBLISH,
    payload: { path:post },
    });
}}