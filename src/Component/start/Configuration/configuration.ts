class Configuration extends HTMLElement { 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `

            `;
        }
    }
}

export default Configuration;