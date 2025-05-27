import { NavigateActions } from "../../flux/Action";

class Sidebar extends HTMLElement {
    private shadow: ShadowRoot;
    private divContent: HTMLDivElement;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const styleLink = document.createElement("link");
        styleLink.setAttribute("rel", "stylesheet");
        styleLink.setAttribute("href", "/sidebar.css");
        this.shadow.appendChild(styleLink);

        this.divContent = document.createElement("div");
        this.divContent.classList.add("container");
        this.shadow.appendChild(this.divContent);
    }

    async connectedCallback() {
        const topSection = document.createElement("div");
        topSection.classList.add("top-section");

        const bottomSection = document.createElement("div");
        bottomSection.classList.add("bottom-section");

        const logo = document.createElement("img");
        logo.src = "assets/icons/logo.svg";
        logo.alt = "Logo";
        logo.classList.add("logo");
        topSection.appendChild(logo);

        try {
            const response = await fetch('/assets/sidebar.json'); 
            const menuItems: { icon: string; text: string; url: string; path: string}[] = await response.json();

            menuItems.forEach(item => {
                const link = document.createElement("a");
                link.href = item.url;
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

                    link.addEventListener("click", (e) => {
                e.preventDefault();
                NavigateActions.navigate(item.path); 
    });
                
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


