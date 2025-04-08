class ProfileComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });


        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', '/smallprofile.css');


        const profileContainer = document.createElement("div");
        profileContainer.classList.add("profile-container");


        const profileHeader = document.createElement("header");
        profileHeader.classList.add("profile-header");
        profileHeader.textContent = "Mi perfil";


        const profileContent = document.createElement("div");
        profileContent.classList.add("profile-content");


        const profileImage = document.createElement("img");
        profileImage.src = "assets/icons/ElipseProfile.png";
        profileImage.alt = "Foto de perfil";
        profileImage.classList.add("profile-image");

        const textContainer = document.createElement("div");
        textContainer.classList.add("text-container");

        const username = document.createElement("h2");
        username.textContent = "Multiplocomun";
        username.classList.add("username");


        const bio = document.createElement("p");
        bio.textContent = "Amante de las hamburguesas y salchipapas...";
        bio.classList.add("bio");

        textContainer.appendChild(username);
        textContainer.appendChild(bio);
        
        profileContent.appendChild(profileImage);
        profileContent.appendChild(textContainer);
        
        profileContainer.appendChild(profileHeader);
        profileContainer.appendChild(profileContent);

        this.shadowRoot!.appendChild(linkElement);
        this.shadowRoot!.appendChild(profileContainer);
    }
}


export default ProfileComponent;