import {authStore} from "../flux/authStore";
import {postStore} from "./../flux/postStore";
import { Post } from "../types/post";
export class MainPage extends HTMLElement {
    private unsubscribe: () => void;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.unsubscribe = () => {};
    }

    async connectedCallback() {
        if (!authStore.user || authStore.isLoading) {
            this.renderLoading();
            return;
        }

        // Suscribirse a cambios en el store
        this.unsubscribe = postStore.subscribe(() => {
            this.render();
        });

        // Cargar posts si no hay en el store
        if (postStore.posts.length === 0) {
            await postStore.fetchPosts();
        }

        this.render();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    private renderLoading() {
        this.innerHTML = '<loading-spinner size="50px"></loading-spinner>';
    }

    private render() {
        if (!this.shadowRoot) return;
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
              overflow: hidden;
              
            }

        app-sidebar {
          flex-shrink: 0;
        }

        #content {
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: auto;
        }

        .Whitecontainer {
          display: flex;
          flex: 1;
          background-color: #fdf4f5;
          border-radius: 20px;
          margin: 1rem;
          gap: 1rem;
          overflow: auto;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 1rem;
        }

        .left-section {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 0.4rem 2rem;
          min-width: 250px;
        }

        .right-section {
          display: flex;
          width: 300px;
          flex-direction: column;
          gap: 5rem;
          padding: 0;
        }

        @media (max-width: 1075px) {
          .Whitecontainer {
            flex-direction: column;
            align-items: stretch;
            flex-wrap: nowrap;
            align-items: center;
          }

          .right-section {
            width: 100%;
            gap: 2rem;
            padding: 1rem 2rem;
          }
        }
      </style>
    <div class="container">
                <app-sidebar></app-sidebar>
                <div class="Whitecontainer">
                    <div class="left-section">
                        <simple-navbar></simple-navbar>
                        <category-carousel></category-carousel>
                        <div style="flex : 1; display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                            ${postStore.posts.map((post: Post) => `
                            <post-card 
                                data-id="${post.id}"
                                data-user="${post.user}"
                            ></post-card>
                        `).join('')}
                        </div>
                    </div>
                    <div class="right-section">
                        <miniprofile-component></miniprofile-component>
                        <suggestion-card></suggestion-card> 
                    </div>
                </div>
            </div>
        `;
    }
}
