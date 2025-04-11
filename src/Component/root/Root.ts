class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('Header');
  }

  connectedCallback() {
    if (this.shadowRoot) {
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
          flex-shrink: 0; /* Sidebar doesn't shrink */
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
          flex-wrap: wrap; /* Allows wrapping on small screens */
        }

        .left-section {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0.4rem 2rem;
          min-width: 250px;
        }

        .post-card {
          max-width: 300px;
          margin: 0 auto;
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

        <div class="Whitecontainer">
          <div class="left-section">
            <simple-navbar></simple-navbar>
            <category-carousel></category-carousel>
            <post-card data-id="1"></post-card>
          </div>

          <div class="right-section">
            <profile-component></profile-component>
            <div class="some-container">
              <suggestion-card></suggestion-card> 
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
}

export default Root;
