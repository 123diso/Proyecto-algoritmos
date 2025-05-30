class Notifications extends HTMLElement { 
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

                    .notifications-container {
                        width: 100%;
                        max-width: 400px;
                        margin: 50px auto;
                        padding: 20px;
                        background: #fff6f6;
                        border-radius: 15px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }

                    .notifications-header {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #c45656;
                        margin-bottom: 20px;
                        text-align: center;
                        margin: 50px auto;
                    }

                    .notification-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px solid #f0dada;
                    }

                    .notification-item:last-child {
                        border-bottom: none;
                    }

                    .notification-left {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 1px solid #ccc;
                    }

                    .notification-text {
                        display: flex;
                        flex-direction: column;
                        font-size: 0.95rem;
                    }

                    .notification-text .username {
                        color: #c45656;
                        font-weight: 600;
                    }

                    .notification-text .action {
                        color: #341515;
                        font-size: 0.85rem;
                    }

                    .follow-btn {
                        background: #c45656;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        padding: 6px 12px;
                        font-size: 0.75rem;
                        cursor: pointer;
                        transition: background 0.3s;
                    }

                    .follow-btn:hover {
                        background: #a13b3b;
                    }
                </style>
                <header class="notifications-header">Notificaciones</header>
                <div class="notifications-container">
                    

                    <div class="notification-item">
                        <div class="notification-left">
                            <img class="avatar" src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?semt=ais_hybrid&w=740" alt="avatar" />
                            <div class="notification-text">
                                <span class="username">EnsaladaTactica</span>
                                <span class="action">ha comentado en tu publicación</span>
                            </div>
                        </div>
                        <button class="follow-btn">Seguir</button>
                    </div>

                    <div class="notification-item">
                        <div class="notification-left">
                            <img class="avatar" src="https://marketplace.canva.com/EAFewoMXU-4/1/0/1600w/canva-purple-pink-gradient-man-3d-avatar-0o0qE2T_kr8.jpg" alt="avatar" />
                            <div class="notification-text">
                                <span class="username">EnsaladaTactica</span>
                                <span class="action">le ha gustado tu publicación</span>
                            </div>
                        </div>
                        <button class="follow-btn">Seguir</button>
                    </div>
                </div>
            `;
                const followButtons = this.shadowRoot.querySelectorAll('.follow-btn');
                followButtons.forEach(button => {
                button.addEventListener('click', () => {
                    console.log('Seguir');
                });
            });
            
        }
    }
}

export default Notifications;
