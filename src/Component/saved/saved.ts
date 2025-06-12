import { store } from '../../flux/Store';

class Saved extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
    }

connectedCallback() {
  store.subscribe(() => this.render()); // se actualiza con los cambios del store
  this.render();
}

private render() {
  if (!this.shadowRoot) return;

  const fixedImages = [
    "./assets/gallery/gal1.jpeg",
    "./assets/gallery/gal2.jpeg",
    "./assets/gallery/gal3.jpeg",
    "./assets/gallery/gal4.jpeg"
  ];

  const savedImages: string[] = store.getState().savedImages;
            
            this.shadowRoot.innerHTML = `
            <style>
            * {
                box-sizing: border-box;
            }
            .container {
                width: 100%;
                height: 100vh;
                overflow: hidden;
            }

            .gallery {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: center;
                max-width: 100%;
            }

            .Whitecontainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                padding-top: 1rem;
                background-color: #fdf4f5;
                border-radius: 20px;
                margin: 1rem;
                gap: 1rem;
                overflow: auto;
                flex-wrap: wrap;
                padding-inline: 5rem;
            }
            .container {
                display: flex;
                width: 100%;
                height: 100vh;
                overflow: hidden;
            }
        .header {
                background-color: #fceeee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #f1caca;
                color: #c45656;
                width: 100%;
            }
            .header .back {
                font-size: 1.2rem;
                cursor: pointer;
            }
            .header-title {
                font-weight: bold;
                font-size: 1.1rem;
            }
            .gallery img{
                width: 180px;
                height: 180px;
                object-fit: cover;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                border: 0.5px solid #c45656;
                transition: transform 0.3s ease;
            }
            .gallery img:hover {
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
            .empty-msg {
                color: #999;
                font-size: 1rem;
                margin-top: 1rem;
            }
            @media (max-width: 786px) {
            .container {
                flex-direction: column;
                height: auto;
            }

            app-sidebar {
                display: block;
                width: 100%;
                order: 2;
            }

            .Whitecontainer {
                padding-inline: 1rem;
            }

            .gallery {
                justify-content: center;
            }

            .gallery img {
                width: 100%;
                max-width: 300px;
            }
        }
            </style>
            
            <div class="container">
                <app-sidebar></app-sidebar>
                <div class="Whitecontainer">
                    <div class="header">
                        <div class="back">←</div>
                        <div class="header-title">Tus guardados</div>
                    </div>
                    <div class="gallery">
                        <!-- Imágenes fijas primero -->
                        ${
                            fixedImages.map(src => `<img src="${src}" alt="">`).join('')
                        }
                        <!-- Imágenes guardadas después -->
                        ${
                            savedImages.length > 0
                                ? savedImages.map(src => `<img src="${src}" alt="Imagen guardada">`).join('')
                                : ''
                        }
                    </div>
                    ${
                        savedImages.length === 0
                            ? `<div class="empty-msg">No tienes imágenes guardadas.</div>`
                            : ''
                    }
                </div>
            </div>
            `;
        }
    }


export default Saved;