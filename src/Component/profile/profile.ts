import { NavigateActions } from "../../flux/Action";
import { store } from "../../flux/Store";

class Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const { name, username, description } = store.getState();

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          * {
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
          }

          .logout {
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
            cursor: pointer;
            margin-top: 1rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.2rem;
            background-color:rgb(224, 124, 124);
            transition: 0.2s;
            max-width: 200px;
          }
          .logout-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;
          }

          .logout:hover {
            background-color: #a83f3f;
            color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          .profile-container {
            width: 100%;
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #fff6f6;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .top-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .left-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%; 
          height: 100%;
          align-items: center;
        }

          .avatar {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            object-fit: cover;
          }

          .username {
            margin: 0.5rem 0 0;
            font-size: 1.8rem;
            color: #c45656;
            font-weight: 700;
            font-style: italic;
          }

          .realname {
            font-size: 0.95rem;
            font-style: italic;
            color: #555;
          }

          .right-section {
            flex: 1;
            margin-left: 2rem;
          }

          .top-actions {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .edit-button, .icon-btn {
            background-color: #c45656;
            color: white;
            font-weight: bold;
            padding: 0.5rem 1.5rem;
            border-radius: 10px;
            font-size: 1rem;
            border: none;
            cursor: pointer;
          }

          .icon-btn img {
            width: 25px;
            height: 25px;
          }

          .stats-group {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            margin-top: 1rem;
            font-size: 1.1rem;
          }

          .stats-group span {
            font-weight: bold;
            color: #c45656;
            font-style: italic;
          }

          .desc {
            font-style: italic;
            margin-top: 1rem;
            color: #333;
          }

          .divider {
            margin: 1.5rem 0 1rem;
            height: 2px;
            background: #c45656;
            opacity: 0.4;
            border-radius: 10px;
          }

          .empty-post {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #c45656;
          }

          .plus-circle {
            background: #d77d7d;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: bold;
            color: white;
            margin-bottom: 1rem;
            border: none;
            outline: none;
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
          align-items: stretch; 
          flex-wrap: nowrap;
          width: 100%;
          height: 100%;
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
            <div class="left-section">
              <div class="profile-container">
                <div class="top-section">
                  <div class="left-section">
                    <img class="avatar" src="/assets/icons/ElipseProfile.png" alt="Avatar" />
                    <h2 class="username">${username || "Usuario"}</h2>
                    <p class="realname">${name || "Tu nombre"}</p>
                  </div>

                  <div class="right-section">
                    <div class="top-actions">
                      <button class="edit-button">Editar perfil</button>
                      <button class="icon-btn" id="config-btn"><img src="/assets/icons/configuration.svg" alt="config" /></button>
                      <button class="icon-btn" id="share-btn"><img src="/assets/icons/flecha.svg" alt="share" /></button>
                    </div>

                    <div class="stats-group">
                      <div><span>Siguiendo:</span> 9999</div>
                      <div><span>Seguidores:</span> 9999</div>
                      <div><span>Publicaciones:</span> 0</div>
                      <div><span>Me gusta:</span> 5</div>
                    </div>

                    <p class="desc">${description || "Escribe tu descripción aquí..."}</p>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="empty-post">
                  <button class="plus-circle" title="Crear publicación">+</button>
                  <p>¡Haz tu primera publicación!</p>
                </div>

                
                <div class="logout-wrapper">
                  <button class="logout">Cerrar sesión</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      `;
    }

    this.shadowRoot?.querySelector('.edit-button')?.addEventListener('click', () => {
      const modal = document.createElement("profile-modal");
      document.body.appendChild(modal);
    });

    this.shadowRoot?.querySelector('#config-btn')?.addEventListener('click', () => {
      NavigateActions.navigate('/configuration');
    });

    this.shadowRoot?.querySelector('#share-btn')?.addEventListener('click', async () => {
      const profileUrl = `https://miapp.com/profile/${username || "usuario"}`;
      try {
        await navigator.clipboard.writeText(profileUrl);
        this.showToast("¡Perfil copiado al portapapeles!");
      } catch (err) {
        this.showToast("No se pudo copiar el link 😓");
      }
    });

    this.shadowRoot?.querySelector('.plus-circle')?.addEventListener('click', () => {
    NavigateActions.navigate('/create');
    });
  }

  private showToast(message: string) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.backgroundColor = '#c45656';
    toast.style.color = 'white';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    toast.style.fontWeight = 'bold';
    toast.style.fontStyle = 'italic';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.3s ease-in-out';
    toast.style.opacity = '1';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }
}

export default Profile;
