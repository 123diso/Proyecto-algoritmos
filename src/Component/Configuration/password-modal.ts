class PasswordModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
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
          width: 450px;
        }

        h2 {
          font-size: 2rem;
          color: #c45656;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        label {
          color: #c45656;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        input {
          padding: 0.8rem;
          border: 2px solid #c45656;
          border-radius: 10px;
          background: transparent;
          font-family: 'Inter', sans-serif;
        }

        .actions {
          display: flex;
          justify-content: space-between;
        }

        .btn {
          padding: 0.6rem 1.5rem;
          border-radius: 10px;
          font-weight: bold;
          font-style: italic;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          cursor: pointer;
        }

        .cancel {
          border: 2px solid #c45656;
          background: transparent;
          color: #c45656;
        }

        .save {
          background: #c45656;
          color: white;
          border: none;
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <h2>Contraseña</h2>

          <div class="input-group">
            <label>Contraseña actual</label>
            <input type="password" id="current" placeholder="Escribe aquí...">
          </div>
          <div class="input-group">
            <label>Nueva contraseña</label>
            <input type="password" id="new" placeholder="Escribe aquí...">
          </div>
          <div class="input-group">
            <label>Confirma tu contraseña</label>
            <input type="password" id="confirm" placeholder="Escribe aquí...">
          </div>

          <div class="actions">
            <button class="btn cancel">Cancelar</button>
            <button class="btn save">Guardar</button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot!.querySelector(".cancel")!.addEventListener("click", () => this.remove());
    this.shadowRoot!.querySelector(".save")!.addEventListener("click", () => this.savePassword());
  }

  savePassword() {
    const current = (this.shadowRoot!.getElementById("current") as HTMLInputElement).value;
    const newPass = (this.shadowRoot!.getElementById("new") as HTMLInputElement).value;
    const confirm = (this.shadowRoot!.getElementById("confirm") as HTMLInputElement).value;

    const storedPass = localStorage.getItem("user-password") || "admin";

    if (current !== storedPass) {
      alert("Contraseña actual incorrecta.");
      return;
    }

    if (newPass !== confirm) {
      alert("La nueva contraseña no coincide.");
      return;
    }

    localStorage.setItem("user-password", newPass);
    alert("Contraseña actualizada exitosamente.");
    this.remove();
  }
}

export default PasswordModal;
