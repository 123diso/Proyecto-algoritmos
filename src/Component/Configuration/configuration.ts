class Configuration extends HTMLElement { 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('configuration');
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            configuration
            `;
        }
    }
}

export default Configuration;
