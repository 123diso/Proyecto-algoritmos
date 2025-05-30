import { NavigateActions } from '../../flux/Action';
import { PostData } from '../start/postcard/postcard';

class PostSett extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
             <style>
                * {
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }

                .container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
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

                .upload-btn {
                    background-color: #fff1f1;
                    border: 2px solid #c45656;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    color: #c45656;
                    font-weight: bold;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .upload-btn:hover {
                    background-color: #fce1e1;
                }

                .image-preview {
                    margin-top: 1rem;
                    max-width: 100%;
                    border-radius: 10px;
                    display: none;
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
                    border-radius: 12px;
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
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-top: 1px solid rgba(255, 255, 255, 0.4);
                    padding-top: 10px;
                    color: white;
                    font-size: 0.9rem;
                }

                .location-input input {
                    padding: 6px 10px;
                    border-radius: 10px;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    outline: none;
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
                            <input type="file" id="imageInput" style="display: none;">
                            <button class="upload-btn" id="uploadTrigger">
                                <img src="https://img.icons8.com/ios-glyphs/30/image.png" alt="icon" />
                                Subir imagenes
                            </button>
                            <img id="preview" class="image-preview"/>
                        </div>
                        <div class="right-side">
                            <div class="user-info">
                                <img src="./assets/icons/ElipseProfile.png" alt="User" />
                                <span>Multipolocomun</span>
                            </div>
                            <textarea id="postText" placeholder="Escribe aqui...."></textarea>
                            <div class="location-input">
                                <span>Añadir lugar</span>
                                <input type="text" id="postLocation" placeholder="Ej: Bogotá" />
                            </div>
                        </div>
                    </div>
                </div>
                    
                    </div>
                </div>
            </div>
        `;

        const trigger = this.shadowRoot!.getElementById('uploadTrigger');
        const input = this.shadowRoot!.getElementById('imageInput') as HTMLInputElement;
        const preview = this.shadowRoot!.getElementById('preview') as HTMLImageElement;

        trigger?.addEventListener('click', () => input?.click());

        input?.addEventListener('change', () => {
            const file = input.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    preview.src = reader.result as string;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        const publishBtn = this.shadowRoot!.querySelector('.publish-btn') as HTMLButtonElement;
        publishBtn.addEventListener('click', () => this.publishPost());
    }

    publishPost() {
        const textArea = this.shadowRoot!.getElementById('postText') as HTMLTextAreaElement;
        const imageInput = this.shadowRoot!.getElementById('imageInput') as HTMLInputElement;

        const reader = new FileReader();
        const file = imageInput?.files?.[0];

        reader.onload = () => {
            const post: PostData= {
                id: Date.now(),
                image: reader.result as string || '',
                text: textArea.value.trim(),
                user: {
                    name: 'Multipolocomun',
                    avatar: './assets/icons/ElipseProfile.png'
                },
                likes: 0,
                comments: [],
                saved: false,
                liked: false,
            };

            const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            storedPosts.unshift(post);
            localStorage.setItem('posts', JSON.stringify(storedPosts));

            alert('¡Publicación creada!');
            NavigateActions.navigate('/main');
        };

        if (file) reader.readAsDataURL(file);
    }
}

export default PostSett;

