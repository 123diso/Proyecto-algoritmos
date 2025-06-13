import { NavigateActions } from "../../flux/Action";
import { AuthService } from "../../service/authService";

export type FormLogin = {
  email: string;
  password: string;
};

const formLogin: FormLogin = {
  email: "",
  password: ""
};

class LoginComponent extends HTMLElement {
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

    form.addEventListener("submit", (e) => this.handleSubmit(e));
    emailInput.addEventListener("change", this.changeEmail);
    passwordInput.addEventListener("change", this.changePassword);
    registerLink?.addEventListener("click", this.goToRegister);
  }

  private changeEmail = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.email = target.value;
  };

  private changePassword = (e: Event) => {
    const target = e.target as HTMLInputElement;
    formLogin.password = target.value;
  };

  private handleSubmit = async (event: Event) => {
    event.preventDefault();
    const errorContainer = this.shadowRoot!.querySelector(".error-message") as HTMLElement;
    errorContainer.textContent = ""; // Limpiar errores previos
    try {
      await AuthService.login(formLogin.email, formLogin.password);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = "Ocurrió un error. Inténtalo de nuevo.";
      const code = error?.code;

      // Traducción del error de Firebase
      switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          errorMessage = "Usuario o contraseña incorrectos.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no tiene un formato válido.";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada.";
          break;
        default:
          errorMessage = "Error al iniciar sesión: " + (error.message || "");
      }

      errorContainer.textContent = errorMessage;
    }
  };

  private goToRegister = (e: Event) => {
    e.preventDefault();
    NavigateActions.navigate("/register");
  };

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML += `
      <style>
        /* Estilos existentes */
        :host {
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 10rem;
          box-sizing: border-box;
          justify-content: space-around;
          gap: 5rem;
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

        .error-message {
          color: #B63B3B;
          background-color: #FBEAEA;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 10px;
          text-align: center;
        }
          @media (max-width: 600px) {
  .background-box {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 1rem !important;
    gap: 2.5rem !important;
    height: auto !important;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .logo-slogan {
    order: 2;
    align-items: center !important;
    text-align: center;
    padding: 0 1rem;
  }

  .logo-slogan .logo {
    width: 8rem;
    margin: 0 auto 1rem;
  }

  .slogan {
    font-size: 16px;
    line-height: 1.6;
    padding: 0 1rem;
    margin: 0 auto;
  }

  .form-card {
    order: 1;
    width: 100% !important;
    max-width: 90% !important;
    padding: 2rem 1.5rem !important;
    box-sizing: border-box;
  }

  .form-card-form {
    gap: 1.5rem !important;
  }

  .btn-submit {
    margin-top: 1rem;
  }
}

      </style>

      <div class="container background-box">
        <div class="logo-slogan">
          <img class="logo" src="./assets/icons/logoletras.svg" alt="Nibble logo">
          <span class="slogan">Nibble te brinda reseñas auténticas, recomendaciones y experiencias gastronómicas en un solo lugar</span>
        </div>

        <div class="form-card">
          <div class="form-card-header">
            <img class="logo" src="./assets/icons/logo.svg" alt="Nibble icon">
          </div>

          <div class="error-message"></div> <!-- Aquí aparece el error -->

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

export default LoginComponent;
