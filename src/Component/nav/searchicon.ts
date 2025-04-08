class SimpleNavbar extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(): void {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('simple-navbar-container');

        const logo: HTMLImageElement = document.createElement('img');
        logo.src = 'assets/icons/logoletras.svg';
        logo.alt = 'Logo';
        logo.classList.add('logo');

        const searchContainer: HTMLDivElement = document.createElement('div');
        searchContainer.classList.add('search-container');
        searchContainer.innerHTML = `
            <input type="text" placeholder="Buscar..." class="search-input">
        `;

        container.appendChild(logo);
        container.appendChild(searchContainer);

        const style: HTMLStyleElement = document.createElement('style');
        style.textContent = `
            .simple-navbar-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
                background-color: #fdf4f5;
                font-family: 'Arial', sans-serif;
            }

            .logo {
                width: auto;
                height: 40px;
                margin-bottom: 0.5rem;
                filter: brightness(0) saturate(100%) invert(28%) sepia(36%) saturate(350%) hue-rotate(319deg) brightness(91%) contrast(87%);
            }

            .search-container {
                display: flex;
                align-items: center;
                border: 2px solid #cc5e5e;
                border-radius: 30px;
                padding: 0.3rem 0.8rem;
                background-color: white;
            }

            .search-input {
                border: none;
                outline: none;
                font-size: 0.9rem;
                padding: 0.4rem;
                color: #cc5e5e;
                background: transparent;
                width: 150px;
            }

            .search-container::after {
                font-size: 1rem;
                margin-left: 0.5rem;
                color: #cc5e5e;
            }
        `;

        this.shadow.appendChild(style);
        this.shadow.appendChild(container);
    }
}


export default SimpleNavbar;


