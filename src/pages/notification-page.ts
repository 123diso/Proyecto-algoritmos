export class NotificationPage extends HTMLElement{
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
          padding-inline: 5rem;
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
         .container {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
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
            <div class="some-container">
              <suggestion-card></suggestion-card>
            </div>
          </div>
        </div>
        </div>\`
        `;
    }
}