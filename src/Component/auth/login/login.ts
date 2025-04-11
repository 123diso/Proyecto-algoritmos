class Login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
  
      connectedCallback(){
          if(this.shadowRoot) {
              this.shadowRoot.innerHTML = `
            
    <form-card>
    
    asasasas
    </form-card>
              `
          }
          
  
      }
  }
  
  export default Login;