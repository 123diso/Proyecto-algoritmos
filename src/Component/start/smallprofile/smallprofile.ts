import { store } from '../../../flux/Store';

class ProfileComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        store.subscribe(() => this.render()); 
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', () => {
            window.history.pushState({}, '', '/profile');
            const popStateEvent = new PopStateEvent('popstate');
            dispatchEvent(popStateEvent);
        });
    }

    private render() {
        if (!this.shadowRoot) return;

        const state = store.getState();
        const username = state.username || "usuario";
        const description = state.description || "Sin descripción";
        const avatar = state.avatar || "/assets/icons/ElipseProfile.png";

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    font-family: 'Inter', sans-serif;
                }
                .profile-container {
                    width: 250px;
                    padding: 20px;
                    background: white;
                    border-radius: 15px;
                    margin-top: 15%;
                }
                .profile-header {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #C45656;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .profile-content {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }
                .profile-image {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #f0f0f0;
                }
                .text-container {
                    display: flex;
                    flex-direction: column;
                }
                .username {
                    font-size: 1rem;
                    margin: 0 0 5px 0;
                    color: #C45656;
                    font-weight: 600;
                }
                .bio {
                    font-size: 0.8rem;
                    color: #341515;
                    margin: 0;
                    line-height: 1.4;
                }
            </style>
            <div class="profile-container">
                <header class="profile-header">Mi perfil</header>
                <div class="profile-content">
                    <img src="${avatar}" alt="Foto de perfil" class="profile-image" />
                    <div class="text-container">
                        <h2 class="username">${username}</h2>
                        <p class="bio">${description}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

export default ProfileComponent;
