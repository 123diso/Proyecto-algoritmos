import { NavigateActions } from "../../flux/Action";
import {AuthService} from "../../service/authService";

export type FormLogin = {
  email: string;
  password: string;
  name: string;
  username: string;
  description: string;
};

const formLogin: FormLogin = {
  email: "",
  password: "",
  name: "",
  username: "",
  description: "",
};

class RegisterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    const form = this.shadowRoot!.querySelector(".form-card-form") as HTMLFormElement;
    const emailInput = this.shadowRoot!.querySelector("#email") as HTMLInputElement;
    const passwordInput = this.shadowRoot!.querySelector("#password") as HTMLInputElement;
    const registerLink = this.shadowRoot!.querySelector(".register");
    const nameInput = this.shadowRoot!.querySelector("#name") as HTMLInputElement;
    const usernameInput = this.shadowRoot!.querySelector("#username") as HTMLInputElement;
    const descriptionInput = this.shadowRoot!.querySelector("#description") as HTMLInputElement;

    form.addEventListener("submit", (e) => this.handleSubmit(e));
    emailInput.addEventListener("change", this.changeEmail);
    passwordInput.addEventListener("change", this.changePassword);
    registerLink?.addEventListener("click", this.goToRegister);
    nameInput?.addEventListener("change", this.changeName);
    usernameInput?.addEventListener("change", this.changeUsername);
    descriptionInput?.addEventListener("change", this.changeDescription);
  }

  private changeEmail = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.email = target.value;
  };

  private changePassword = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.password = target.value;
  };

  private changeName = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.name = target.value;
  };

  private changeUsername = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.username = target.value;
  };

  private changeDescription = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.description = target.value;
  }

  private handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
      AuthService.register(formLogin.email, formLogin.password, formLogin.username, formLogin.name, formLogin.description);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  private goToRegister = (e: Event) => {
    e.preventDefault();
  };

    private render() {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML += `
        <style>
       
        :host{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #F2E6E6;
            margin: 0;
            padding: 0;
            
        }
        
          .background-box {
            background-image: url('./assets/imageslogin/Vector 3.svg'), url('./assets/imageslogin/Vector 4.svg');
            background-position: top left, bottom right;
            background-repeat: no-repeat;
            background-size: contain, contain;
            width: 100vw;
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            padding: 10rem;
            box-sizing: border-box;
            justify-content: space-around;
            gap: 5rem;
          }
        
        /* Imagen arriba */
        .backgroundimg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
        }
        
        /* Imagen abajo */
        .backgroundimg1 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
        }
        
        .logo-slogan {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;        
            }
        
        .logo-slogan .logo {
            width: 15rem;
            margin-bottom: 1rem;
        }
        
        .slogan {
            font-size: 20px;
            color: #3D2C2C;
            font-weight: 500;
            line-height: 1.6;
        }
        
        .form-card {
            flex: 1;
            max-width: 400px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            padding: 40px 30px;
            position: relative;
        }
        
        .form-card-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .form-card-header .logo {
            max-width: 80px;
            border-radius: 50%;
        }
        
        .form-card-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .input-group {
            display: flex;
            align-items: center;
            background-color: #F8DADA;
            border-radius: 10px;
            padding: 10px 12px;
            gap: 10px;
        }
        
        .input-group input {
            flex: 1;
            border: none;
            background: transparent;
            font-size: 14px;
            outline: none;
            color: #4D3C3C;
        }
        
        .input-group input::placeholder {
            color: #7D6B6B;
        }
        
        .input-group img {
            width: 18px;
            height: 18px;
        }
        
        .forget-password {
            text-align: right;
            color: #B26060;
            font-size: 13px;
            text-decoration: none;
            margin-top: -8px;
        }
        
        .forget-password:hover {
            text-decoration: underline;
        }
        
        .btn-submit {
            background-color: #C94C4C;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .btn-submit:hover {
            background-color: #B63B3B;
        }
        
        .form-card-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #6B4F4F;
        }
        
        .register {
            color: #D45B5B;
            text-decoration: none;
            font-weight: 600;
        }
        
        .register:hover {
            text-decoration: underline;
        }
        
        #description {
            width: 100%;
            height: 80px;
            padding: 10px;
            border-radius: 10px;
            border: none;
            background-color: #F8DADA;
            font-size: 14px;
            color: #4D3C3C;
            resize: none;
            font-family: 'Arial', sans-serif;
        }

        </style>

            <div class="background-box">
                
                <div class="form-card">
                    <div class="form-card-header" style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                        <img class="logo" src="./assets/icons/logo.svg" alt="Nibble icon">
                        <span style="color: #3D2C2C">¡Regístrate para ver las reseñas y fotos de la comida!</span>
                    </div>
                    
                    <form class="form-card-form">
                        <div class="input-group">
                            <input type="email" id="email" name="email" required placeholder="Correo electrónico">
                        </div>
                        <div class="input-group">
                            <input type="password" id="password" name="password" required placeholder="Contraseña">
                        </div>
                         <div class="input-group">
                            <input type="text" id="name" name="name" required placeholder="Nombre completo">
                        </div>
                        <div class="input-group">
                            <input type="text" id="username" name="username" required placeholder="Nombre de usuario">
                        </div>     
                        <div class="input-group">
                            <textarea id="description" name="description" required placeholder="Escribe una descripción..."></textarea>
                        </div>                   
                        <button type="submit" class="btn-submit">Registrarse</button>
                    </form>
                    
                    <p class="form-card-footer">¿Ya tienes una cuenta? <a href="/" class="register">Logueate</a></p>
                </div>
            </div>
        `;

  const login = this.shadowRoot.querySelector(".register");
    login!.addEventListener("click", (e) => {
      e.preventDefault();
      NavigateActions.navigate("/");
    });
  }
}

export default RegisterComponent;
