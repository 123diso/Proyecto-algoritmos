class Root extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({mode: 'open'});
  console.log('Header');
  }

    connectedCallback(){
        if(this.shadowRoot) {
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
        }


        .Whitecontainer{
            display: flex;
            flex: 1;
            background-color: #fdf4f5;
            border-radius: 20px;
            margin: 1rem;
            gap: 1rem;
            overflow: hidden;
            align-items: flex-start;
            }

        .left-section {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 1rem;
            padding: 1rem;
        }
        .post-card {      
            max-width: 300px;
            margin: 0 auto;
            }

          .right-section {
            display: flex;
            width: 300px;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

      </style>

  <div class="container">
      <app-sidebar></app-sidebar>

      <div class="Whitecontainer">
        <div class="left-section">
           <simple-navbar></simple-navbar>
           <post-card data-id="1"></post-card>
        </div>
        
        <div class="right-section">
           <profile-component></profile-component>
        </div>  
      </div>
  </div>
          `
      }
  }
}

export default Root;