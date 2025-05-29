import { store, State } from '../../flux/Store';
import { NavigateActions  } from '../../flux/Action';

export const routes: Record<string, {component: string; protected: boolean}> = {
  '/login': { component: 'login-component', protected: false },
    '/register': { component: 'register-component', protected: false },
    '/main': { component: 'main-component', protected: true },
    '/notification': { component: 'notification-page', protected: true },
    '/create': { component: 'create-post', protected: true },
    '/saved': { component: 'saved-component', protected: true },
    '/profile': { component: 'profile-component', protected: true },
    '/configuration': { component: 'configuration-element', protected: true },
}
class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleRouteChange = this.handleRouteChange.bind(this);
    store.subscribe((state: State) => this.handleRouteChange(state));
  }

  connectedCallback() {
    this.render();
    this.handleRouteChange();

    this.addEventListener("nav-change", (e: Event) => {
      const section = (e as CustomEvent).detail.section;
      NavigateActions.navigate(`/${section}`);
    });

    window.addEventListener("popstate", () => this.handleRouteChange());
  }

handleRouteChange(state: State = store.getState()) {
  if (!this.shadowRoot) return;


  const path = state.currentPath || window.location.hash.slice(1) || '/';
  window.history.replaceState({}, '', `#${path}`);

  const content = this.shadowRoot.querySelector('#content');
  if (!content) return;

  let mainContent = "";

  switch (path) {
    case "/notification":
      mainContent = `
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
        </div>`;
      break;

    case "/create":
      mainContent = `
        <div class="Whitecontainer">
          <create-post></create-post>
        </div>`;
      break;

    case "/saved":
      mainContent = `
        <div class="Whitecontainer">
          <saved-component></saved-component>
        </div>`;
      break;

    case "/profile":
      mainContent = `
        <div class="Whitecontainer">
          <div class="left-section">
            <profile-component></profile-component>
          </div>
        </div>`;
      break;

    case "/configuration":
      mainContent = `
        <div class="Whitecontainer">
          <configuration-element></configuration-element>
        </div>`;
      break;

    case "/main":
      console.log("error")
      mainContent = `
        <div class="Whitecontainer">
          <div class="left-section">
            <simple-navbar></simple-navbar>
            <category-carousel></category-carousel>
            <post-card data-id="1"></post-card>
          </div>
          <div class="right-section">
            <miniprofile-component></miniprofile-component>
            <suggestion-card></suggestion-card> 
          </div>
        </div>`;
      break;

    case "/register":
      mainContent = `<register-component></register-component>`;
      break;

    case "/":
    default:
      mainContent = `<login-component></login-component>`;
      break;
  }

  content.innerHTML = mainContent;
}

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
     
      <div class="container">
        <app-sidebar></app-sidebar>
        <div id="content"></div>
      </div>
    `;
  }
}

export default Root;



