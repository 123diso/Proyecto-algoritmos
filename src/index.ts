console.log("Hello, TypeScript!");

import  Sidebar  from './Component/layout/sidebar';
import SimpleNavbar from './Component/nav/searchicon';
import ProfileComponent from './Component/start/smallprofile/smallprofile';
import CategoryCarousel from './Component/start/carousel/category';
import PostCard from './Component/start/postcard/postcard';
import SuggestionCard from './Component/start/suggestions/suggestionCard';
import Notifications from './Component/notifications/notifications';
import CreatePost from './Component/postsett/postsett';
import Saved from './Component/saved/saved';
import Configuration from './Component/Configuration/configuration';
import Profile from './Component/profile/profile';  
import LoginComponent from './Component/auth/login';
import RegisterComponent from './Component/auth/register';
import {MainPage} from "./pages/main-page";
import {NotificationPage} from "./pages/notification-page";
import ProfileModal from './Component/profile/profile-modal';
import NotificationModal from './Component/Configuration/notification-modal';



customElements.define('post-card', PostCard);
customElements.define('app-sidebar', Sidebar);
customElements.define('simple-navbar', SimpleNavbar);
customElements.define('miniprofile-component', ProfileComponent);
customElements.define('category-carousel', CategoryCarousel);
customElements.define("suggestion-card", SuggestionCard);
customElements.define("notification-element", Notifications);
customElements.define('create-post', CreatePost);
customElements.define('saved-component',Saved);
customElements.define("configuration-element", Configuration);
customElements.define('profile-component', Profile);
customElements.define("login-component", LoginComponent);
customElements.define("register-component", RegisterComponent);
customElements.define('main-page', MainPage);
customElements.define('notification-page', NotificationPage);



import PasswordModal from './Component/Configuration/password-modal';

if (!customElements.get("password-modal")) {
  customElements.define("password-modal", PasswordModal);
}
if (!customElements.get('profile-modal')) {
  customElements.define("profile-modal", ProfileModal);
}

if (!customElements.get('notification-modal')) {
  customElements.define("notification-modal", NotificationModal);
}
import {store} from "./flux/Store";
import {renderRouterView} from "./router";

window.addEventListener('DOMContentLoaded', () => {
    store.subscribe((state) => {
        console.log('Nuevo estado:', state);
        renderRouterView();
    });
    renderRouterView();
});


window.addEventListener('popstate', () => {
    store.setStateWithPath(window.location.pathname);
    renderRouterView();
});