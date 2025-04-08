class Sidebar extends HTMLElement {
    private divContent: HTMLDivElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const styleLink = document.createElement("link");
        styleLink.setAttribute("rel", "stylesheet");
        styleLink.setAttribute("href", "/sidebar.css");

        this.divContent = document.createElement("div");
        this.divContent.classList.add("container");

        const topSection = document.createElement("div");
        topSection.classList.add("top-section");

        const bottomSection = document.createElement("div");
        bottomSection.classList.add("bottom-section");

        const logo = document.createElement("img");
        logo.src = "assets/icons/logo.svg"; 
        logo.alt = "Logo";
        logo.classList.add("logo");
        topSection.appendChild(logo);

        const menuItems = [
            { icon: "assets/icons/home.svg", text: "Inicio", url: "inicio.html" },
            { icon: "assets/icons/notifications.svg", text: "Notificaciones", url: "notificaciones.html" },
            { icon: "assets/icons/create.svg", text: "Crear", url: "crear.html" },
            { icon: "assets/icons/saves.svg", text: "Guardados", url: "guardados.html" },
        ];

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
        });


        const profileLink = document.createElement("a");
        profileLink.href = "perfil.html"; 
        profileLink.classList.add("menu-item", "profile");

        const profileImg = document.createElement("img");
        profileImg.classList.add("profile-img");
        profileImg.src = "assets/icons/ElipseProfile.png"; 
        profileImg.alt = "Perfil";

        const profileText = document.createElement("span");
        profileText.classList.add("text");
        profileText.textContent = "Perfil";

        profileLink.appendChild(profileImg);
        profileLink.appendChild(profileText);
        topSection.appendChild(profileLink);

        const configLink = document.createElement("a");
        configLink.href = "configuracion.html"; 
        configLink.classList.add("menu-item");

        const configIcon = document.createElement("img");
        configIcon.classList.add("icon");
        configIcon.src = "assets/icons/configuration.svg";
        configIcon.alt = "Configuración";

        const configText = document.createElement("span");
        configText.classList.add("text");
        configText.textContent = "Configuración";

        configLink.appendChild(configIcon);
        configLink.appendChild(configText);
        bottomSection.appendChild(configLink);

        this.divContent.appendChild(topSection);
        this.divContent.appendChild(bottomSection);

        this.shadowRoot!.appendChild(styleLink);
        this.shadowRoot!.appendChild(this.divContent);
    }
}

export default Sidebar;

