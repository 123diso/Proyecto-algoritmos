import { NavigateActions } from "../../flux/Action";

class Sidebar extends HTMLElement {
    private shadow: ShadowRoot;
    private divContent: HTMLDivElement;
    private toggleButton: HTMLButtonElement;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement("style");
        style.textContent = `
            :host {
                display: block;
                height: 100vh;
            }

            .container {
                width: 200px;
                height: 100vh;
                background-color: #C45656;
                padding: 20px;
                display: flex;
                flex-direction: column;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
            }

            .container.show {
                transform: translateX(0);
            }

            .menu-toggle {
                position: fixed;
                top: 10px;
                left: 10px;
                width: 40px;
                height: 40px;
                background-color: #C45656;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 24px;
                cursor: pointer;
                z-index: 1100;
                display: block;
            }

            @media (min-width: 768px) {
                .container {
                    position: static;
                    transform: none !important;
                }

                .menu-toggle {
                    display: none;
                }
            }

            .menu-item {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                margin: 5px 0;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                transition: background-color 0.3s;
            }

            .menu-item:hover {
                color: white;
                font-weight: bold;
            }

            .text {
                font-size: 1.3em;
                color: rgba(255, 255, 255, 0.5);
                font-family: 'Inter', sans-serif;
            }

            .menu-item .icon {
                width: 28px;
                height: 28px;
                margin-right: 10px;
            }

            .logo {
                width: 100px;
                display: flex;
                align-items: center;
                margin: 0 auto 5vh auto;
            }

            .bottom-section {
                margin-top: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `;
        this.shadow.appendChild(style);

        this.toggleButton = document.createElement("button");
        this.toggleButton.classList.add("menu-toggle");
        this.toggleButton.textContent = "☰";
        this.shadow.appendChild(this.toggleButton);

        this.divContent = document.createElement("div");
        this.divContent.classList.add("container");
        this.shadow.appendChild(this.divContent);
    }

    async connectedCallback() {

        this.toggleButton.addEventListener("click", () => {
            this.divContent.classList.toggle("show");
        });

        const topSection = document.createElement("div");
        const bottomSection = document.createElement("div");
        bottomSection.classList.add("bottom-section");

        const logo = document.createElement("img");
        logo.src = "assets/icons/logo.svg";
        logo.alt = "Logo";
        logo.classList.add("logo");
        topSection.appendChild(logo);

        try {
            const response = await fetch('/assets/sidebar.json');
            const menuItems: { icon: string; text: string; url: string; path: string }[] = await response.json();

            menuItems.forEach(item => {
                const link = document.createElement("a");
                link.href = item.path;
                link.classList.add("menu-item");

                const iconImg = document.createElement("img");
                iconImg.classList.add("icon");
                iconImg.src = item.icon;
                iconImg.alt = item.text;

                const textSpan = document.createElement("span");
                textSpan.classList.add("text");
                textSpan.textContent = item.text;

                link.appendChild(iconImg);
                link.appendChild(textSpan);
                topSection.appendChild(link);

                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    NavigateActions.navigate(item.path);
                    this.divContent.classList.remove("show"); 
                });
            });
        } catch (error) {
            console.error('Error al cargar el menú:', error);
            topSection.innerHTML += `<p>Error al cargar el menú.</p>`;
        }

        this.divContent.appendChild(topSection);
        this.divContent.appendChild(bottomSection);
    }
}


export default Sidebar;



