class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.render("inicio");

      this.addEventListener("nav-change", (e: Event) => {
        const section = (e as CustomEvent).detail.section;
        this.render(section);
      });
    }
  }

  render(section: string) {
    if (!this.shadowRoot) return;

    let mainContent = "";

    switch (section) {
      case "notificaciones":
        mainContent = `
        <div class="container">
          <app-sidebar></app-sidebar>

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
          </div>
        </div>
        `;
        break;

      case "crear":
        mainContent = `
        <div class="container">
          <app-sidebar></app-sidebar>

        <div class="Whitecontainer">
              <create-post></create-post>
        </div>
        `;
        break;

      case "guardados":
        mainContent = `
        <div class="container">
          <app-sidebar></app-sidebar>

          <div class="Whitecontainer">
            <div class="">
              <saved-component></saved-component>
              </div>
            </div>
        </div>
        `;
        break;

      case "perfil":
        mainContent = `
        <div class="container">
          <app-sidebar></app-sidebar>

          <div class="Whitecontainer">
            <div class="left-section">
              <profile-component></profile-component>
            </div>
          </div>
        </div>
        `;
        break;

      default: 
        mainContent = `
        <div class="container"> 
          <app-sidebar></app-sidebar>

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
          </div>
        </div>
        `;
        break;
    }

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

      ${mainContent}
    `;
  }
}

export default Root;


