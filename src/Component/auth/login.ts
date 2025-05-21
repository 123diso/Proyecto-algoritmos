import { logueado } from "../../service/service";

export type FormLogin = {
  email: string;
  password: string;
};

const formLogin: FormLogin = {
  email: "",
  password: "",
};


class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        const form = this.shadowRoot!.querySelector('.form-card-form') as HTMLFormElement;
        const emailInput = this.shadowRoot!.querySelector('#email') as HTMLInputElement;
        const passwordInput = this.shadowRoot!.querySelector('#password') as HTMLInputElement;
        const registerLink = this.shadowRoot!.querySelector('.register');

        
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        emailInput.addEventListener('change', this.changeEmail);
        passwordInput.addEventListener('change', this.changePassword);
        registerLink?.addEventListener('click', this.goToRegister);
    }

    private changeEmail = (e: Event) => {
        const target = e.target as HTMLInputElement;
        formLogin.email = target.value;
    };

    private changePassword = (e: Event) => {
        const target = e.target as HTMLInputElement;
        formLogin.password = target.value;
        console.log(formLogin)
    };

    private handleSubmit = (event: Event) => {
        event.preventDefault();
        console.log("Iniciaste sesion")
        logueado(formLogin)
    };

    private goToRegister = (e: Event) => {
        e.preventDefault();
        
    }

    private render() {
        if (!this.shadowRoot) return;
         const link = document.createElement("link");
         link.rel = "stylesheet";
        link.href = "/login.css";
        this.shadowRoot!.appendChild(link);
        this.shadowRoot.innerHTML += `
            <div class="container">
                <div class="logo-slogan">
                    <img class="logo" src="./../../../../public/assets/Images/logoletras.svg" alt="Nibble logo">
                    <span class="slogan">Nibble te brinda reseñas auténticas, recomendaciones y experiencias gastronómicas en un solo lugar</span>
                </div>
                
                <div class="form-card">
                    <div class="form-card-header">
                        <img class="logo" src="./../../../../public/assets/Images/logotipo.png" alt="Nibble icon">
                    </div>
                    
                    <form class="form-card-form">
                        <div class="input-group">
                            <input type="email" id="email" name="email" required placeholder="Correo electrónico">
                        </div>
                        <div class="input-group">
                            <input type="password" id="password" name="password" required placeholder="Contraseña">
                        </div>
                        <a class="forget-password" href="">¿Olvidaste tu contraseña?</a>
                        <button type="submit" class="btn-submit">Iniciar sesión</button>
                    </form>
                    
                    <p class="form-card-footer">¿No tienes una cuenta? <a href="#" class="register">Regístrate aquí</a></p>
                </div>
            </div>
        `;
    }
}

customElements.define("login-component", LoginComponent);
export default LoginComponent;
