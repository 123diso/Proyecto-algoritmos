class CategoryCarousel extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    }
    async connectedCallback() {
    try {
        const response = await fetch('/assets/categories.json');
        const categories: { img: string; link: string }[] = await response.json();

        this.shadow.innerHTML = `
            <style>
                /* ... tus estilos anteriores (puedes copiarlos aquí) ... */
                .main-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 15px;
                    max-width: fit-content;
                    margin: 0 auto;
                    padding: 20px;
                }
                .carousel-container {
                    overflow: hidden;
                    width: 56vh;
                    border-radius: 15px;
                    background: white;
                    padding: 5px;
                }
                .carousel {
                    display: flex;
                    gap: 16px;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    padding: 10px 5px;
                    height: 65px;
                    align-items: center;
                }
                .carousel::-webkit-scrollbar {
                    height: 8px;
                }
                .carousel::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                    margin: 0 10px;
                }
                .carousel::-webkit-scrollbar-thumb {
                    background: #e57373;
                    border-radius: 10px;
                    transition: background 0.3s;
                }
                .carousel::-webkit-scrollbar-thumb:hover {
                    background: rgb(228, 96, 96);
                }
                .item {
                    flex: 0 0 auto;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 3px solid #C45656;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .item:hover {
                    transform: scale(1.1);
                }
                img {
                    width: 40px;
                    height: 40px;
                    object-fit: contain;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .title {
                    font-family: Arial, sans-serif;
                    color: #C45656;
                    margin: 0 0 15px 0;
                    font-size: 1.2rem;
                }
                .popup {
                position: absolute;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 380px;
                border: 2px solid #C45656;
                border-radius: 10px;
                z-index: 999;
                background: white;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                display: none;

                resize: both;
                overflow: hidden;
                min-width: 200px;
                min-height: 150px;
                max-width: 90vw;
                max-height: 90vh;

                display: flex;
                flex-direction: column;
                }

                .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #C45656;
                color: white;
                padding: 5px 10px;
                cursor: move;
                user-select: none;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                font-size: 0.9rem;
                font-weight: bold;
                flex-shrink: 0;
                            }
                .popup-header .move-label {
                flex: 1;
                user-select: none;
            }

            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
                cursor: pointer;
                margin-left: 8px;
                user-select: none;
            }

            .close-btn:hover {
                color: #ffdada;
            }

                .popup iframe {
                    width: 100%;
                    height: 75%;

                }
                    #goToLinkBtn {
                    margin-top: 15px;
                    padding: 8px 16px;
                    background-color: #C45656;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background 0.3s;
                }

                #goToLinkBtn:hover {
                    background-color: #a23d3d;
                }
                .popup-footer {
                display: flex;
                justify-content: flex-start;
                padding: 8px 10px;
                background: white;
                border-top: 1px solid #eee;
                flex-shrink: 0;
            }

            .popup-footer button#goToLinkBtn {
                background-color: #C45656;
                color: white;
                border: none;
                padding: 6px 14px;
                border-radius: 6px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: background 0.3s;
            }

            .popup-footer button#goToLinkBtn:hover {
                background-color: #a23d3d;
            }
            .popup-resizer {
            position: absolute;
            right: 5px;
            bottom: 5px;
            width: 50px;
            height: 20px;
            background: #C45656;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 0.7rem;
            font-weight: bold;
            user-select: none;
        }
        .popup-resizer::after {
            content: "↘";
        }
            .popup-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.85);
            padding: 10px 20px;
            border-radius: 8px;
            color: #C45656;
            font-weight: bold;
            font-family: Arial, sans-serif;
            z-index: 1000;
            pointer-events: none;
            display: none;
        }



            </style>
            <div class="main-container">
                <div class="header">
                    <h3 class="title">Categorías</h3>
                </div>
                <div class="carousel-container">
                    <div class="carousel" id="carousel">
                        ${categories.map((cat, idx) => `
                            <div class="item" data-link="${cat.link}" data-index="${idx}">
                                <img src="${cat.img}" alt="category" />
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="popup" id="popup">
                    <div class="popup-header" id="popupHeader">
                        <span class="move-label">Mover</span>
                        <button class="close-btn" id="popupCloseBtn" title="Cerrar">×</button>
                    </div>

                    <iframe id="popupIframe"></iframe>
                    <div class="popup-loader" id="popupLoader">Cargando...</div>
                    <div class="popup-footer">
                        <button id="goToLinkBtn">Ir a la página</button>
                        <div class="popup-resizer" title="Agrandar">Big </div>

                    </div>
                </div>

            </div>
        `;
        const iframe = this.shadow.getElementById('popupIframe') as HTMLIFrameElement;
        const loader = this.shadow.getElementById('popupLoader')!;

            iframe.addEventListener('load', () => {
                loader.style.display = 'none';
            });
        const popup = this.shadow.getElementById('popup')!;
        const closeBtn = this.shadow.getElementById('popupCloseBtn')!;
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            iframe.src = '';
            currentOpenIndex = null;
        });

        popup.style.display = 'none';
        let currentOpenIndex: string | null = null;
        let lastClickedLink: string | null = null;

this.shadow.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', () => {
        const link = item.getAttribute('data-link')!;
        const index = item.getAttribute('data-index')!;
        lastClickedLink = link;

        if (link.startsWith('/')) {
        window.location.href = link;
        return;
        }

        if (currentOpenIndex === index) {
        popup.style.display = 'none';
        loader.style.display = 'block';
        iframe.src = ''; 
        currentOpenIndex = null;
        } else {
        iframe.src = link; 
        popup.style.display = 'block';
        currentOpenIndex = index;
        }
    });
    const goToBtn = this.shadow.getElementById('goToLinkBtn')!;
goToBtn.addEventListener('click', () => {
    if (lastClickedLink) {
        window.open(lastClickedLink, '_blank'); 
    } else {
        alert('Selecciona una categoría primero.');
    }
});

    });

    const header = this.shadow.getElementById("popupHeader") as HTMLElement;

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

            header.addEventListener("mousedown", (e: MouseEvent) => {
            isDragging = true;
            const rect = popup.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.body.style.userSelect = "none";
            });

            document.addEventListener("mouseup", () => {
            isDragging = false;
            document.body.style.userSelect = "auto";
            });

            document.addEventListener("mousemove", (e: MouseEvent) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            popup.style.left = `${x}px`;
            popup.style.top = `${y}px`;
            popup.style.transform = `none`;
            });

    } catch (error) {
        console.error('Error al cargar categorías:', error);
        this.shadow.innerHTML = '<p>Error al cargar categorías.</p>';
    }
}

}

export default CategoryCarousel;

