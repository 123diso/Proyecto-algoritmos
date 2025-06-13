
class SimpleNavbar extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('simple-navbar-container');

        const logo: HTMLImageElement = document.createElement('img');
        logo.src = 'assets/icons/logoletras.svg';
        logo.alt = 'Logo';
        logo.classList.add('logo');

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar...';
        searchInput.classList.add('search-input');

const resultsContainer = document.createElement('div');
resultsContainer.classList.add('search-results');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (query.length > 0) {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const filteredUsers = posts
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((p: any) => p.user.name)
            .filter((name: string, index: number, self: string[]) =>
                name.toLowerCase().includes(query) && self.indexOf(name) === index
            );

        filteredUsers.forEach((username: string) => {
            const item = document.createElement('div');
            item.textContent = username;
            item.classList.add('result-item');

        item.addEventListener('click', () => {
            const targetId = `post-${username.toLowerCase()}`;

            setTimeout(() => {

                const mainPage = document.querySelector('main-page') as HTMLElement;

                if (!mainPage || !mainPage.shadowRoot) {
                    console.warn('No se encontró el componente <main-page> o su shadowRoot');
                    return;
                }


                const postElement = mainPage.shadowRoot.querySelector(`#${targetId}`);

                if (postElement) {
                    const whiteContainer = mainPage.shadowRoot.querySelector('.Whitecontainer') as HTMLElement;

                    if (whiteContainer && postElement) {
                        const postRect = postElement.getBoundingClientRect();
                        const containerRect = whiteContainer.getBoundingClientRect();

                        const offset = postRect.top - containerRect.top + whiteContainer.scrollTop;

                        whiteContainer.scrollTo({
                            top: offset,
                            behavior: 'smooth',
                        });

                        postElement.classList.add('highlight');
                        setTimeout(() => postElement.classList.remove('highlight'), 2000);
                    }

                    postElement.classList.add('highlight');
                    setTimeout(() => postElement.classList.remove('highlight'), 2000);
                } else {
                    console.warn(`No se encontró ningún elemento con id="${targetId}" dentro de <main-page>`);
                }

                resultsContainer.innerHTML = '';
                searchInput.value = '';
            }, 100);
        });

            resultsContainer.appendChild(item);
        });
    }
});


        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(resultsContainer);
        container.appendChild(logo);
        container.appendChild(searchContainer);

        const style: HTMLStyleElement = document.createElement('style');
        style.textContent = `
        
            .simple-navbar-container {
                display: flex;
                flex-direction: column;
                align-items: center;

            }

            .logo {
                width: auto;
                height: 50px;
                margin-bottom: 0.5rem;
                color: C45656;
            }

            .search-container {
                display: flex;
                align-items: center;
                border: 2px solid #C45656;
                border-radius: 30px;
                background-color: white;
                width: 50vh;
                margin-top: 30px;
            }

            .search-input {
                border: none;
                outline: none;
                font-size: 0.9rem;
                padding: 1rem;
                color: #cc5e5e;
                background: transparent;
                width: 200px;
            }

            .search-container::after {
                font-size: 1rem;
                margin-left: 0.5rem;
                color: #cc5e5e;
            }
        `;
            style.textContent += `
        .search-results {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 10px;
            max-height: 150px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 100px;
            
        }

        .result-item {
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.85rem;
        }

        .result-item:hover {
            background-color: #f0dada;
        }
    `;


        this.shadow.appendChild(style);
        this.shadow.appendChild(container);
    }
}

export default SimpleNavbar;


