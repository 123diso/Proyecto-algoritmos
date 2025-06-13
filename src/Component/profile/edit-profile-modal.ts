import { store } from "../../flux/Store";
import { AuthService } from "../../service/authService";

class EditProfileModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    const user = store.getState();
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
            padding-top: 60px;
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border-radius: 15px;
            width: 80%;
            max-width: 500px;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            cursor: pointer;
          }
          label, input, textarea {
            display: block;
            width: 100%;
            margin-bottom: 10px;
          }
          button {
            margin-right: 10px;
            padding: 10px 15px;
          }
        </style>

        <div class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Editar Perfil</h2>
            <form id="editForm">    
              <label for="name">Nombre:</label>
              <input type="text" id="name" name="name" value="${user.name || ''}">
              <label for="username">Nombre de usuario:</label>
              <input type="text" id="username" name="username" value="${user.username || ''}">
              <label for="description">Descripción:</label>
              <textarea id="description" name="description">${user.description || ''}</textarea>
              <button type="button" class="cancel">Cancelar</button>
              <button type="submit" class="save">Guardar</button>
            </form>
          </div>
        </div>
      `;
    }
  }

  addEventListeners() {
    this.shadowRoot?.querySelector(".cancel")?.addEventListener("click", this.handleCancel);
    this.shadowRoot?.querySelector(".close")?.addEventListener("click", this.handleCancel);
    this.shadowRoot?.querySelector("#editForm")?.addEventListener("submit", this.handleSave);
  }

  removeEventListeners() {
    this.shadowRoot?.querySelector(".cancel")?.removeEventListener("click", this.handleCancel);
    this.shadowRoot?.querySelector(".close")?.removeEventListener("click", this.handleCancel);
    this.shadowRoot?.querySelector("#editForm")?.removeEventListener("submit", this.handleSave);
  }

  async handleSave(e: Event) {
    e.preventDefault();
    const shadow = this.shadowRoot!;
    const name = (shadow.querySelector("#name") as HTMLInputElement).value;
    const username = (shadow.querySelector("#username") as HTMLInputElement).value;
    const description = (shadow.querySelector("#description") as HTMLTextAreaElement).value;

    const currentUser = store.getState();
    const email = currentUser.email;

    try {
      await AuthService.editProfile(email, "", username, name, description);
      alert("Perfil actualizado exitosamente.");
      this.remove(); // o puedes ocultarlo
    } catch (error) {
      alert("Error al guardar cambios. Revisa la consola.");
      console.error(error);
    }
  }

  handleCancel() {
    this.remove(); // o puedes usar `this.style.display = 'none';`
  }
}

customElements.define('edit-profile-modal', EditProfileModal);
export default EditProfileModal;
