console.log("Hello, TypeScript!");

import  Sidebar  from './Component/layout/sidebar';
import SimpleNavbar from './Component/nav/searchicon';
import ProfileComponent from './Component/start/smallprofile/smallprofile';
import Root from './Component/root/Root';
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



customElements.define('post-card', PostCard);
customElements.define('app-sidebar', Sidebar);
customElements.define('simple-navbar', SimpleNavbar);
customElements.define('miniprofile-component', ProfileComponent);
customElements.define("my-root", Root);
customElements.define('category-carousel', CategoryCarousel);
customElements.define("suggestion-card", SuggestionCard);
customElements.define("notification-element", Notifications);
customElements.define('create-post', CreatePost);
customElements.define('saved-component',Saved);
customElements.define("configuration-element", Configuration);
customElements.define('profile-component', Profile);
customElements.define("login-component", LoginComponent);
customElements.define("register-component", RegisterComponent);

