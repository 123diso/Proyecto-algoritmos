class  Saved extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log('NotificationsComponent constructor');
    }

    connectedCallback() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
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
            
            .gallery {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                
                & img{
                    width: 180px;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 0.5px solid #c45656;
                    transition: transform 0.3s ease;
                }
                
                & img:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
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
                        <img src="./assets/gallery/gal1.jpeg" alt=""></img>
                        <img src="./assets/gallery/gal2.jpeg" alt=""></img>
                        <img src="./assets/gallery/gal3.jpeg" alt=""></img>
                        <img src="./assets/gallery/gal4.jpeg" alt=""></img>
                        
                    </div>
                </div>
            `;
        }
    }
}

export default Saved;