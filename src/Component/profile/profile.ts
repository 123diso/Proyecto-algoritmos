import {NavigateActions} from "../../flux/Action";

class Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('NotificationsComponent constructor');
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          * {
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
          }
            
           .logout{
            font-size: 1.2rem;
            font-weight: bold;   
            color: white;   
            cursor: pointer;
            margin-top: 1rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.2rem;
            background-color: #efbaba;
            transition: 0.2s;
           }
           
           .logout:hover {
            background-color: #a83f3f;
            color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: 0.2s;
           }
          .profile-container {
            width: 100%;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
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

          .edit-button {
            background-color: #c45656;
            color: white;
            font-weight: bold;
            padding: 0.5rem 1.5rem;
            border-radius: 10px;
            font-size: 1rem;
            border: none;
            cursor: pointer;
          }

          .icon-btn {
            background-color: #c45656;
            border: none;
            border-radius: 10px;
            padding: 0.5rem 1rem;
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

          .logout {
            text-align: right;
            font-style: italic;
            font-weight: bold;
            color: #c45656;
            cursor: pointer;
            margin-bottom: 2rem;
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
          
           .left-section {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0.4rem 2rem;
          min-width: 250px;
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
        <div class="left-section">
            
        <div class="profile-container">
          <div class="top-section">
            <div class="left-section">
              <img class="avatar" src="/assets/icons/ElipseProfile.png" alt="Avatar" />
              <h2 class="username">Multiplocomun</h2>
              <p class="realname">Lupe Lopez</p>
            </div>

            <div class="right-section">
              <div class="top-actions">
                <button class="edit-button">Editar perfil</button>
                <button class="icon-btn"><img src="/assets/icons/configuration.svg" alt="config" /></button>
                <button class="icon-btn"><img src="/assets/icons/flecha.svg" alt="share" /></button>
              </div>

              <div class="stats-group">
                <div><span>Siguiendo:</span> 9999</div>
                <div><span>Seguidores:</span> 9999</div>
                <div><span>Publicaciones:</span> 0</div>
                <div><span>Me gusta:</span> 5</div>
              </div>

              <p class="desc">Escribe tu descripcion aqui!....</p>
            </div>
          </div>

          <div class="divider"></div>
          <button class="logout">Cerrar sesión</button>

          <div class="empty-post">
            <button class="plus-circle" title="Crear publicación">+</button>
            <p>¡Haz tu primera publicación!</p>
          </div>
        </div>
        
        </div>
        </div>
        </div>
      `;
    }
    const logoutBtn = this.shadowRoot?.querySelector('.logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        console.log('Logout');
        e.preventDefault();
        NavigateActions.logout();
      });
    }
  }
}

export default Profile;
