class NotificationModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const savedSettings = JSON.parse(localStorage.getItem("notifications") || "{}");

    const defaultSettings = {
      enabled: true,
      comments: true,
      mentions: true,
      likes: true,
      following: true,
      followers: true,
    };

    const settings = { ...defaultSettings, ...savedSettings };

    this.shadowRoot!.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          font-family: 'Inter', sans-serif;
        }

        .modal {
          background: #fff6f6;
          padding: 2rem;
          border-radius: 20px;
          width: 420px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h2 {
          color: #c45656;
          font-size: 1.8rem;
          font-weight: bold;
          margin: 0;
        }

        .toggle {
          width: 40px;
          height: 22px;
          background-color: #c45656;
          border-radius: 999px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .toggle::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background-color: #fdf4f5;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .toggle.disabled {
          background-color: #888;
        }

        .toggle.disabled::before {
          transform: translateX(18px);
        }

        .setting {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-style: italic;
          color: #341515;
          font-size: 1rem;
        }

        .setting input[type="checkbox"] {
          appearance: none;
          width: 22px;
          height: 22px;
          border: 2px solid #c45656;
          border-radius: 6px;
          background-color: white;
          position: relative;
          cursor: pointer;
        }

        .setting input[type="checkbox"]:checked::after {
          content: '✔';
          color: white;
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #c45656;
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }

        .setting input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
        }

        .btn {
          padding: 0.6rem 1.8rem;
          border-radius: 10px;
          font-weight: bold;
          font-style: italic;
          font-size: 1rem;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }

        .cancel {
          background: transparent;
          color: #c45656;
          border: 2px solid #c45656;
        }

        .save {
          background: #c45656;
          color: white;
          border: none;
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <div class="modal-header">
            <h2>Notificaciones</h2>
            <div id="toggle" class="toggle ${!settings.enabled ? 'disabled' : ''}"></div>
          </div>

          <div class="setting">
            <label>Comentarios</label>
            <input type="checkbox" id="comments" ${settings.comments ? "checked" : ""}>
          </div>
          <div class="setting">
            <label>Menciones</label>
            <input type="checkbox" id="mentions" ${settings.mentions ? "checked" : ""}>
          </div>
          <div class="setting">
            <label>Nuevos “Me gusta”</label>
            <input type="checkbox" id="likes" ${settings.likes ? "checked" : ""}>
          </div>
          <div class="setting">
            <label>Cuentas que sigues</label>
            <input type="checkbox" id="following" ${settings.following ? "checked" : ""}>
          </div>
          <div class="setting">
            <label>Nuevos seguidores</label>
            <input type="checkbox" id="followers" ${settings.followers ? "checked" : ""}>
          </div>

          <div class="actions">
            <button class="btn cancel">Cancelar</button>
            <button class="btn save">Guardar</button>
          </div>
        </div>
      </div>
    `;

    const toggle = this.shadowRoot!.getElementById("toggle")!;
    const inputs = this.shadowRoot!.querySelectorAll("input[type='checkbox']");

    const setDisabled = (disable: boolean) => {
      inputs.forEach((input) => {
        (input as HTMLInputElement).disabled = disable;
      });
    };

    setDisabled(!settings.enabled);

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("disabled");
      setDisabled(toggle.classList.contains("disabled"));
    });

    this.shadowRoot!.querySelector(".cancel")!.addEventListener("click", () => this.remove());
    this.shadowRoot!.querySelector(".save")!.addEventListener("click", () => {
      const isEnabled = !toggle.classList.contains("disabled");
      const settings = {
        enabled: isEnabled,
        comments: (this.shadowRoot!.getElementById("comments") as HTMLInputElement).checked,
        mentions: (this.shadowRoot!.getElementById("mentions") as HTMLInputElement).checked,
        likes: (this.shadowRoot!.getElementById("likes") as HTMLInputElement).checked,
        following: (this.shadowRoot!.getElementById("following") as HTMLInputElement).checked,
        followers: (this.shadowRoot!.getElementById("followers") as HTMLInputElement).checked,
      };

      localStorage.setItem("notifications", JSON.stringify(settings));
      this.remove();
    });
  }
}

export default NotificationModal;

if (!customElements.get("notification-modal")) {
  customElements.define("notification-modal", NotificationModal);
}
