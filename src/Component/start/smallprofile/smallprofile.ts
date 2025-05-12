class ProfileComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('ProfileComponent constructor');
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                *{
                    font-family: 'Inter', sans-serif;
                }
                    .profile-container {
                        width: 250px;
                        padding: 20px;
                        height: auto;
                        background: white;
                        border-radius: 15px;
                        font-family: 'Segoe UI', sans-serif;
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
                        align-items: flex-start;
                    }

                    .profile-image {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 2px solid #f0f0f0;
                        flex-shrink: 0;
                        cursor: pointer;
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
                        <img id="profile-image" src="assets/icons/ElipseProfile.png" alt="Foto de perfil" class="profile-image" />
                        <div class="text-container">
                            <h2 class="username">Multiplocomun</h2>
                            <p class="bio">Amante de las hamburguesas y salchipapas...</p>
                        </div>
                    </div>
                </div>
            `;

        }
    }
}

export default ProfileComponent;

