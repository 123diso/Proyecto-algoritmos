import { NavigateActions } from "../../flux/Action";

class Sidebar extends HTMLElement {
    private shadow: ShadowRoot;
    private divContent: HTMLDivElement;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement("style");
        style.textContent = `
          .container {
                    display: flex;
                    flex-direction: column;
                    width: 200px;
                    height: 80vh;
                    background-color: #C45656;
                    padding: 20px;
                
                }
                
                .menu-item {
                
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    margin: 5px 0;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    text-decoration: none;
                
                }
                
                .menu-item:hover {
                    color: #e9ecef;
                }
                
                .text:hover {
                    color: #e9ecef;
                }
                
                
                .text {
                    font-size: 1.3em;
                    color: rgba(255, 255, 255, 0.5);
                    font-family: 'Inter', sans-serif;
                
                }
                
                .menu-item:hover {
                    color: white;
                    font-weight: bold;
                
                }
                
                .menu-item .icon:hover  {
                    font-weight: bold;
                
                }
                
                .menu-item .icon,
                .menu-item .profile-img {
                    width: 28px;
                    height: 28px;
                    margin-bottom: 5px;
                    margin-right: 10px;
                }
                
                .logo {
                    width: 100px;
                    display: flex;
                    align-items: center;
                    margin: 0 auto;
                    margin-bottom: 5vh;
                
                
                
                }
                
                
                .bottom-section {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                
                
                 `;
        this.shadow.appendChild(style);

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


