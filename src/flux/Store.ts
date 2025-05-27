import { AppDispatcher, Action } from './Dispatcher';
import { NavigateActionsType } from './Action';

export type State = {
currentPath: string;
};

type Listener = (state: State) => void;

export class Store {
private _myState: State = {
    currentPath: '/',
};

private _listeners: Listener[] = [];

constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
}

getState(): State {
    return this._myState;
}

_handleActions(action: Action): void {
    switch (action.type) {
    case NavigateActionsType.NAVIGATE:
        if (action.payload && 'path' in action.payload) {
        this._myState = {
            ...this._myState,
            currentPath: action.payload.path,
        };
        this._emitChange();
        this.persist();
        }
        break;


        /*case NavigateActionsType.LOGIN:
        this._myState = {
    ...this._myState,
    currentPath: action.payload?.path || '/main',
        };
        this._emitChange();
        this.persist();
        break; */
    }
    
}

private _emitChange(): void {
    const state = this.getState();
    this._listeners.forEach((listener) => listener(state));
}

subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState()); 
}

unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter((l) => l !== listener);
}

persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
}

load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
    this._myState = JSON.parse(persistedState);
    } else {
    this._myState = { currentPath: '/' };
    }
    this._emitChange();
}
}

export const store = new Store();

