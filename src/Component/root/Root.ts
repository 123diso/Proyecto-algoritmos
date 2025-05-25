
class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  connectedCallback() {
    this.render();
    this.handleRouteChange();

    this.addEventListener("nav-change", (e: Event) => {
      const section = (e as CustomEvent).detail.section;
      window.history.pushState({}, '', `/${section}`);
      this.handleRouteChange();
    });

    window.addEventListener("popstate", this.handleRouteChange);
  }

  handleRouteChange() {
    if (!this.shadowRoot) return;
    const path = window.location.pathname;
    const content = this.shadowRoot.querySelector('#content');
    if (!content) return;

    let mainContent = "";

    switch (path) {
      
      case "/notificaciones":
        mainContent = `
          <div class="Whitecontainer">
            <div class="left-section">
              <notification-element></notification-element>
            </div>
            <div class="right-section">
              <miniprofile-component></miniprofile-component>
              <div class="some-container">
                <suggestion-card></suggestion-card> 
              </div>
            </div>
          </div>`;
        break;

      case "/crear":
        mainContent = `
          <div class="Whitecontainer">
            <create-post></create-post>
          </div>`;
        break;

      case "/guardados":
        mainContent = `
          <div class="Whitecontainer">
            <div class="">
              <saved-component></saved-component>
            </div>
          </div>`;
        break;

      case "/perfil":
        mainContent = `
          <div class="Whitecontainer">
            <div class="left-section">
              <profile-component></profile-component>
              
            </div>
          </div>`;
        break;

      case "/configuration":
      mainContent = `
        <div class="Whitecontainer">
          <configuration-element></configuration-element>

        </div>`;
        break;
      

      case "/main":
        mainContent = `
          <div class="Whitecontainer">
            <div class="left-section">
              <simple-navbar></simple-navbar>
              <category-carousel></category-carousel>
              <post-card data-id="1"></post-card>
            </div>
            <div class="right-section">
              <miniprofile-component></miniprofile-component>
              <div>
                <suggestion-card></suggestion-card> 
              </div>
            </div>
          </div>`;
        break;

        case "/register":
          mainContent = "<register-component></register-component>"
          break;


        case "/":
          default:
          mainContent = "<login-component></login-component>"

          break;

        
    }

    content.innerHTML = mainContent;
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        app-sidebar {
          flex-shrink: 0;
        }

        #content {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: auto;
        }

        .Whitecontainer {
          display: flex;
          flex: 1;
          background-color: #fdf4f5;
          border-radius: 20px;
          margin: 1rem;
          gap: 1rem;
          overflow: auto;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .left-section {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0.4rem 2rem;
          min-width: 250px;
        }

        .right-section {
          display: flex;
          width: 300px;
          flex-direction: column;
          gap: 5rem;
          padding: 0;
        }

        @media (max-width: 900px) {
          .Whitecontainer {
            flex-direction: column;
            align-items: stretch;
          }

          .right-section {
            width: 100%;
            gap: 2rem;
            padding: 1rem 2rem;
          }
        }
      </style>

      <div class="container">
        <app-sidebar></app-sidebar>
        <div id="content"></div>
      </div>
    `;
  }
}

export default Root;



