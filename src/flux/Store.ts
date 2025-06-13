import { AppDispatcher, Action } from './Dispatcher';
import { NavigateActionsType } from './Action';

export type State = {
  currentPath: string;
  isAuthenticated: boolean;
  email?: string;
  password?: string;
  name: string;
  username: string;
  description: string;
  avatar: string;
  savedImages: string[];
  searchQuery: string;
  uid: string;
};

type Listener = (state: State) => void;

export class Store {
  private _state: State = {
    currentPath: window.location.pathname,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    email: 'admin@admin.com',
    password: 'admin',
    name: localStorage.getItem('profileName') || 'Lupe Lopez',
    username: localStorage.getItem('profileUsername') || 'multiplocomun',
    description: localStorage.getItem('profileDescription') || 'Amante de las hamburguesas y salchipapas...',
    avatar: localStorage.getItem('profileAvatar') || '/assets/icons/ElipseProfile.png',
    savedImages: JSON.parse(localStorage.getItem('savedImages') || '[]'),
    searchQuery: '',
    uid: ''
  };

  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
  }

  private _handleActions(action: Action): void {
    
    switch (action.type) {
        case NavigateActionsType.SEARCH_USER:
    if (action.payload?.path !== undefined) {
      this._state.searchQuery = action.payload.path;
      this._emitChange();
    }
    break;
      case NavigateActionsType.SAVE_IMAGE:
        if (action.payload?.path && !this._state.savedImages.includes(action.payload.path)) {
          this._state.savedImages.push(action.payload.path);
          localStorage.setItem('savedImages', JSON.stringify(this._state.savedImages));
          this._emitChange();
        }
        break;

      case NavigateActionsType.UNSAVE_IMAGE:
        if (action.payload?.path) {
          this._state.savedImages = this._state.savedImages.filter(url => url !== action.payload!.path);
          localStorage.setItem('savedImages', JSON.stringify(this._state.savedImages));
          this._emitChange();
        }
        break;

      case NavigateActionsType.NAVIGATE:
        if (action.payload) {
          if (typeof action.payload.path === 'string') {
            this._state.currentPath = action.payload.path;
          }
          this._emitChange();
        }
        break;

    }
  }

  subscribe(listener: Listener): () => void {
    this._listeners.push(listener);
    listener(this._state);

    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
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
      this._emitChange(); 
    }
  }

  setStateWithAuth(isAuthenticated: boolean): void {
    this._state.isAuthenticated = isAuthenticated;
    this._emitChange();
  }

  setStateWithCredentials(email?: string, password?: string): void {
    if (email !== undefined) this._state.email = email;
    if (password !== undefined) this._state.password = password;
    this._emitChange();
  }

  setUserProfile(name: string, username: string, description: string, avatar: string, uid: string): void {
    this._state.name = name;
    this._state.username = username;
    this._state.description = description;
    this._state.avatar = avatar;
    this._state.uid = uid;

    localStorage.setItem('profileName', name);
    localStorage.setItem('profileUsername', username);
    localStorage.setItem('profileDescription', description);
    localStorage.setItem('profileAvatar', avatar);

    this._emitChange();
  }

  private _emitChange(): void {
    this._listeners.forEach((l) => l(this._state));
  }
}

export const store = new Store();
