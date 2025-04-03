class Sidebar extends HTMLElement {

    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        

        this.divContent = document.createElement("div") 
        this.divContent.classList.add("container");

        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", "sidebar.css");

        shadow.appendChild(this.divContent)
        shadow.appendChild(linkElement);
    }


}

export default Sidebar;