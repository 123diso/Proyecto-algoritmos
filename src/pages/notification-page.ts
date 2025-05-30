export class NotificationPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
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
          padding: 1rem;
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

        @media (max-width: 1075px) {
          .Whitecontainer {
            flex-direction: column;
            align-items: stretch;
            flex-wrap: nowrap;
            align-items: center;
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
            <notification-element></notification-element>
          </div>
          <div class="right-section">
            <miniprofile-component></miniprofile-component>
            <suggestion-card></suggestion-card>
          </div>
        </div>
      </div>
    `;
  }
}
