console.log("Hello, TypeScript!");

import  Sidebar  from './Component/layout/sidebar';
import SimpleNavbar from './Component/nav/searchicon';
import ProfileComponent from './Component/start/smallprofile/smallprofile';
import Root from './Component/root/Root';
import CategoryCarousel from './Component/start/carousel/category';


customElements.define('app-sidebar', Sidebar);
customElements.define('simple-navbar', SimpleNavbar);
customElements.define('profile-component', ProfileComponent);
customElements.define("my-root", Root);
customElements.define('category-carousel', CategoryCarousel);