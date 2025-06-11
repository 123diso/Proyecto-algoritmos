import { store } from '../../flux/Store';

class PasswordModal extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadow.innerHTML = `
      <style>
        .modal {
          background: white;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          max-width: 400px;
          margin: auto;
        }
        input {
          width: 100%;
          margin: 0.5rem 0;
        }
        button {
          margin-top: 1rem;
        }
      </style>
      <div class="modal">
        <h3>Cambiar contraseña</h3>
        <input type="password" id="oldPass" placeholder="Contraseña actual" />
        <input type="password" id="newPass" placeholder="Nueva contraseña" />
        <button id="save">Guardar</button>
        <button id="cancel">Cancelar</button>
      </div>
    `;

    this.shadow.getElementById('save')?.addEventListener('click', () => {
      const oldPass = (this.shadow.getElementById('oldPass') as HTMLInputElement).value;
      const newPass = (this.shadow.getElementById('newPass') as HTMLInputElement).value;

      const current = store.getState().password;

      if (oldPass !== current) {
        alert('La contraseña actual no es correcta');
        return;
      }

      store.setStateWithCredentials(store.getState().email, newPass);
      alert('Contraseña actualizada. ¡Usa esta nueva al iniciar sesión!');
      this.remove();
    });

    this.shadow.getElementById('cancel')?.addEventListener('click', () => {
      this.remove();
    });
  }
}

export default PasswordModal;
