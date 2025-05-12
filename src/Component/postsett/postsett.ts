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

                .container {
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
                    background-color: #d47777;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
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
            </style>

            <div class="container">
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
                            <img src="https://via.placeholder.com/35" alt="User" />
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
        `;
    }
}
}

export default CreatePost;
