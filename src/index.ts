console.log("Hello, TypeScript!");

import  Sidebar  from './Component/layout/sidebar';
import SimpleNavbar from './Component/nav/searchicon';
import ProfileComponent from './Component/start/smallprofile/smallprofile';
import Root from './Component/root/Root';
import PostCard from './Component/start/postcard/postcard';


customElements.define('post-card', PostCard);
customElements.define('app-sidebar', Sidebar);
customElements.define('simple-navbar', SimpleNavbar);
customElements.define('profile-component', ProfileComponent);
customElements.define("my-root", Root);