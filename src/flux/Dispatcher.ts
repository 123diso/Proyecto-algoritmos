export type PathPayload = {
//eslint-disable-next-line @typescript-eslint/no-explicit-any
path: any;
};

export type Action = {
  type: string;
  payload?: {
    path?: string;
    email?: string;
    password?: string;
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
  };
};

export class Dispatcher {
private _listeners: Array<(action: Action) => void> = [];

register(callback: (action: Action) => void): void {
    this._listeners.push(callback);
}

dispatch(action: Action): void {
    for (const listener of this._listeners) {
    listener(action);
    }
}
}

export const AppDispatcher = new Dispatcher();