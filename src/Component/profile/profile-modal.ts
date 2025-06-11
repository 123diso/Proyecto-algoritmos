import { store } from "../../flux/Store";

class ProfileModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    const state = store.getState();
    const name = state.name || "";
    const username = state.username || "";
    const description = state.description || "";
    const avatar = state.avatar || "/assets/icons/ElipseProfile.png";

    this.shadowRoot!.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: #fff6f6;
          padding: 2rem;
          border-radius: 20px;
          max-width: 700px;
          width: 90%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .header, .footer {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .profile-pic {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-pic img {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
        }

        button, input, textarea {
          font-family: 'Inter', sans-serif;
        }

        .btn {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .btn-primary {
          background-color: #C45656;
          color: white;
        }

        .btn-outline {
          background: transparent;
          color: #C45656;
          border: 2px solid #C45656;
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border: 2px solid #C45656;
          border-radius: 10px;
          padding: 1rem;
        }

        .info-group label {
          font-weight: bold;
          color: #C45656;
        }

        .info-group input,
        .info-group textarea {
          border: none;
          outline: none;
          background: transparent;
          resize: none;
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <div class="header">
            <div class="profile-pic">
              <img id="profileImage" src="${avatar}" />
              <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button class="btn btn-primary" id="changePhoto">Cambiar foto</button>
                <button class="btn btn-outline" id="removePhoto">Quitar foto</button>
              </div>
              <input type="file" id="fileInput" accept="image/*" style="display: none;" />
            </div>

            <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
              <div class="info-group">
                <label>Nombre</label>
                <input type="text" id="name" value="${name}" />
              </div>
              <div class="info-group">
                <label>Nombre de usuario</label>
                <input type="text" id="username" value="${username}" />
              </div>
              <div class="info-group">
                <label>Descripción</label>
                <textarea id="description" rows="3">${description}</textarea>
              </div>
            </div>
          </div>

          <div class="footer">
            <button class="btn btn-outline" id="cancel">Cancelar</button>
            <button class="btn btn-primary" id="save">Guardar</button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot!.getElementById("cancel")!.addEventListener("click", () => this.remove());
    this.shadowRoot!.getElementById("save")!.addEventListener("click", () => this.saveChanges());

    const fileInput = this.shadowRoot!.getElementById("fileInput") as HTMLInputElement;
    const profileImg = this.shadowRoot!.getElementById("profileImage") as HTMLImageElement;

    this.shadowRoot!.getElementById("changePhoto")!.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          profileImg.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    });

    this.shadowRoot!.getElementById("removePhoto")!.addEventListener("click", () => {
      profileImg.src = "/assets/icons/ElipseProfile.png";
    });
  }

  private saveChanges() {
    const name = (this.shadowRoot!.getElementById("name") as HTMLInputElement).value;
    const username = (this.shadowRoot!.getElementById("username") as HTMLInputElement).value;
    const description = (this.shadowRoot!.getElementById("description") as HTMLTextAreaElement).value;
    const avatar = (this.shadowRoot!.getElementById("profileImage") as HTMLImageElement).src;

    const profile = { name, username, description, avatar };
    localStorage.setItem("profile", JSON.stringify(profile));
    store.setUserProfile(name, username, description, avatar);

    this.remove();
  }
}

export default ProfileModal;
