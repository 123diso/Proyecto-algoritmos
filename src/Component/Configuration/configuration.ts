import { NavigateActions } from '../../flux/Action';

class Configuration extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('configuration');
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        :host {
          display: flex;
          height: 100%;
          width: 100%;
        }

        .main-container {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: #fff6f6;
          border-radius: 20px;
          padding: 2rem;
          justify-content: space-between;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header h1 {
          font-size: 2rem;
          font-weight: bold;
          color: #c45656;
          margin: 0;
        }

        .back-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          color: #c45656;
          cursor: pointer;
        }

        .options-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin: 4rem 0;
        }

        .option {
          background-color: #fff1f1;
          border: 2px solid #c45656;
          border-radius: 15px;
          padding: 1.5rem;
          width: 180px;
          height: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .option:hover {
          transform: scale(1.05);
        }

        .option img {
          width: 50px;
          height: 50px;
        }

        .option span {
          color: #c45656;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .content-area {
          flex: 1;
          border-radius: 10px;
          padding: 1rem;
        }

        .logout-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .logout-btn {
          background-color: #c45656;
          color: white;
          font-weight: bold;
          font-style: italic;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.5rem;
          cursor: pointer;
        }

        .Whitecontainer {
          display: flex;
          flex: 1;
          background-color: #fdf4f5;
          border-radius: 20px;
          margin: 1rem;
          gap: 1rem;
          overflow: auto;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .container {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
      </style>

      <div class="container">
        <app-sidebar></app-sidebar>
        <div class="Whitecontainer">
          <div class="main-container">
            <div class="header">
              <button class="back-btn">←</button>
              <h1>Configuración</h1>
            </div>

            <div class="options-container">
              <div class="option">
                <img src="/assets/icons/ConfPerfil.svg" alt="Perfil" />
                <span>Perfil</span>
              </div>
              <div class="option">
                <img src="/assets/icons/ConfNotificaciones.svg" alt="Notificaciones" />
                <span>Notificaciones</span>
              </div>
              <div class="option">
                <img src="/assets/icons/ConfContraseña.svg" alt="Contraseña" />
                <span>Contraseña</span>
              </div>
            </div>

            <div class="content-area"></div>

            <div class="logout-container">
              <button class="logout-btn" id="logout">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // ✅ Logout funcional
     const logoutBtn = this.shadowRoot.querySelector('#logout');
    logoutBtn?.addEventListener('click', () => {
      NavigateActions.logout();
    });

    const options = this.shadowRoot.querySelectorAll('.option');
    options.forEach(option => {
      const label = option.querySelector('span')?.textContent?.trim().toLowerCase();
      
      if (label === 'perfil') {
        option.addEventListener('click', () => {
          const modal = document.createElement('profile-modal');
          document.body.appendChild(modal);
        });
      }

      if (label === 'notificaciones') {
        option.addEventListener('click', () => {
          const modal = document.createElement('notification-modal');
          document.body.appendChild(modal);
        });
      }

      if (label === 'contraseña') {
        option.addEventListener('click', () => {
          const modal = document.createElement('password-modal');
          document.body.appendChild(modal);
        });
      }
    });
  }
}

export default Configuration;
