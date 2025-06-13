
import { autorun, IReactionDisposer } from "mobx";
import { authStore } from "../../flux/authStore";
import { postStore } from "../../flux/postStore";
import { store } from "../../flux/Store";
import { Post } from "../../types/post";
import { db } from "../../service/firebase";
import { doc, getDoc } from "firebase/firestore";
import {NavigateActions} from "../../flux/Action";

class Profile extends HTMLElement {
  private disposer: IReactionDisposer | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Esperar a que el usuario esté cargado
    const interval = setInterval(() => {
      if (authStore.user && !authStore.isLoading) {
        clearInterval(interval);
        this.setup();
      } else {
        this.renderLoading();
      }
    }, 100);

  }

  disconnectedCallback() {
    if (this.disposer) this.disposer();
  }

  private async setup() {
    // Evita recargar si ya se tienen posts del usuario
    if (postStore.userPosts.length === 0) {
      await postStore.fetchUserPosts(store.getState().username);
    }

    // Reacción reactiva con MobX
    this.disposer = autorun(() => {
      this.render();
    });

    this.render(); // Primer render
  }

  private renderLoading() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `<loading-spinner size="50px"></loading-spinner>`;
    }
  }

  private async render() {
    if (!this.shadowRoot) return;

    const { name, username, description, avatar, email } = store.getState();
    const userPosts = postStore.userPosts;

    let followers = 0;
    let following = 0;
    const likes = postStore.totalLikes;

    if (!email) {
      this.shadowRoot.innerHTML = `<p>Error: usuario no válido.</p>`;
      return;
    }

    try {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        followers = parseInt(data.followers) || 0;
        following = parseInt(data.following) || 0;
      }
    } catch (error) {
      console.error("Error al obtener datos del perfil:", error);
    }

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
          position: relative;
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
          position: absolute;
          bottom: 12px;
          right: 24px;
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
          overflow: scroll;
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
                  <img class="avatar" src="${avatar || './assets/icons/ElipseProfile.png'}" alt="Avatar" />
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
                    <div><span>Siguiendo:</span> ${following}</div>
                    <div><span>Seguidores:</span> ${followers}</div>
                    <div><span>Publicaciones:</span> ${userPosts.length}</div>
                    <div><span>Me gusta:</span> ${likes}</div>
                  </div>

                  <p class="desc">${description || "Escribe tu descripción aquí..."}</p>
                </div>
              </div>

              <div class="divider"></div>
              <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; padding-bottom: 3rem">
                ${
        userPosts.length > 0
            ? userPosts.map((post: Post) => `
                        <post-card data-id="${post.id}"></post-card>
                      `).join("")
            : `<p>No hay publicaciones aún.</p>`
    }
              </div>

              <div class="empty-post">
                <button class="plus-circle" title="Crear publicación">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.plus-circle')) {
        NavigateActions.navigate('/create');
      }
    });
  }
}

export default Profile;
