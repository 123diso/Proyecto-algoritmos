class Profile extends HTMLElement { 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('NotificationsComponent constructor');
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            
            `;
        }
    }
}

export default Profile;
