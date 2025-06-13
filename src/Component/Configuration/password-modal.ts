import { store } from '../../flux/Store';
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

class PasswordModal extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal {
          background: #fff6f6;
          padding: 2rem;
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
          font-family: 'Inter', sans-serif;
        }

        h2 {
          color: #c45656;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        input {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #c45656;
          border-radius: 10px;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        button {
          padding: 0.7rem 2rem;
          font-weight: bold;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          border: 2px solid #c45656;
        }

        .cancel-btn {
          background-color: transparent;
          color: #c45656;
        }

        .save-btn {
          background-color: #c45656;
          color: white;
        }
      </style>
      <div class="overlay">
        <div class="modal">
          <h2>Contraseña</h2>
          <input id="current" type="password" placeholder="Contraseña actual">
          <input id="new" type="password" placeholder="Nueva contraseña">
          <input id="confirm" type="password" placeholder="Confirma tu contraseña">
          <div class="actions">
            <button class="cancel-btn">Cancelar</button>
            <button class="save-btn">Guardar</button>
          </div>
        </div>
      </div>
    `;
  }

  addListeners() {
    const cancelBtn = this.shadow.querySelector('.cancel-btn') as HTMLButtonElement;
    const saveBtn = this.shadow.querySelector('.save-btn') as HTMLButtonElement;

    cancelBtn.addEventListener('click', () => this.remove());

    saveBtn.addEventListener('click', async () => {
      const current = (this.shadow.querySelector('#current') as HTMLInputElement).value;
      const nueva = (this.shadow.querySelector('#new') as HTMLInputElement).value;
      const confirm = (this.shadow.querySelector('#confirm') as HTMLInputElement).value;

      if (!current || !nueva || !confirm) return alert('Por favor completa todos los campos.');
      if (nueva !== confirm) return alert('Las contraseñas no coinciden.');

      const auth = getAuth();
      const user = auth.currentUser;
      const email = store.getState().email;

      if (!user || !email) return alert('Usuario no autenticado.');

      try {
        const cred = EmailAuthProvider.credential(email, current);
        await reauthenticateWithCredential(user, cred);
        await updatePassword(user, nueva);
        alert('Contraseña actualizada correctamente.');
        this.remove();
      } catch (err) {
        console.error(err);
        alert('Error al actualizar la contraseña.');
      }
    });
  }
}

customElements.define('password-modal', PasswordModal);
export default PasswordModal;
