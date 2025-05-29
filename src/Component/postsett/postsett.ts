class CreatePost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if(this.shadowRoot){
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }

                .container-inside {
                    width: 100%;
                    max-width: 800px;
                    height: auto;
                    margin: 40px auto;
                    border-radius: 12px;
                    overflow: hidden;
                    background-color: #fff6f6;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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

                .publish-btn {
                    background: #c45656;
                    color: white;
                    border: none;
                    padding: 6px 14px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .content {
                    display: flex;
                    background-color: #d46b6b;
                    color: white;
                    width: 100%;
                    height: 80%;
                    border-radius: 12px;
                }

                .left-side {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 10px;
                    border-right: 2px solid rgba(255, 255, 255, 0.3);
                    text-align: center;
                }

                .left-side img {
                    width: 50px;
                    margin-bottom: 15px;
                }

                .left-side p {
                    font-weight: 600;
                    opacity: 0.8;
                }

                .right-side {
                    flex: 2;
                    padding: 20px;
                    background-color: rgb(208,119,128);
                    flex-direction: column;
                    gap: 15px;
                    margin: 2rem;
                    display: grid;
                    grid-template-rows: 1fr 5fr 0.5fr;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                }

                .user-info img {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                }

                textarea {
                    background: transparent;
                    border: none;
                    resize: none;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                    height: 100px;
                }

                .location-input {
                    border-top: 1px solid rgba(255, 255, 255, 0.4);
                    padding-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9rem;
                    opacity: 0.9;
                }

                .location-input i {
                    font-style: normal;
                    opacity: 0.6;
                    margin-right: 5px;
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
            </style>
            <div class="container">
            <app-sidebar></app-sidebar>
            <div class="Whitecontainer">
                <div class="header">
                    <div class="back">←</div>
                    <div class="header-title">Crea tu publicacion</div>
                    <button class="publish-btn">Publicar</button>
                </div>

                <div class="content">
                    <div class="left-side">
                        <img src="https://img.icons8.com/ios-glyphs/30/image.png" alt="icon" />
                        <p>Subir imagenenes</p>
                    </div>
                    <div class="right-side">
                        <div class="user-info">
                            <img src="./assets/icons/ElipseProfile.png" alt="User" />
                            <span>Multipolocomun</span>
                        </div>
                        <textarea placeholder="Escribe aqui...."></textarea>
                        <div class="location-input">
                            <span>Añadir lugar</span>
                            <i>📍</i>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
    }
}
}

export default CreatePost;
