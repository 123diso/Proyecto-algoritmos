// components/common/loading-spinner.ts
class LoadingSpinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
      <style>
        .spinner {
          width: 40px;
          height: 40px;
          margin: 100px auto;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner"></div>
    `;
    }
}

customElements.define('loading-spinner', LoadingSpinner);