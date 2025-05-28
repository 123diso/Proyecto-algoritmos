import { uploadToCloudinary } from "../../service/service";

const formPost = {
    desc: "",
    img: "",
    user: "user_id_aqui", 
    place: "" 
}

class CreatePost extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        const publishBtn = this.shadow.querySelector('.publish-btn');
        const caption = this.shadow.querySelector('.caption') as HTMLTextAreaElement;
        const uploadArea = this.shadow.querySelector('.left-side') as HTMLElement;

    
        const imgInput = document.createElement("input");
        imgInput.type = "file";
        imgInput.style.display = "none";

        uploadArea.addEventListener("click", () => imgInput.click());

        imgInput.addEventListener("change", async () => {
            const file = imgInput.files?.[0];
            if (file) {

            const imageUrl = await uploadToCloudinary ( file ) 
            
            formPost.img = imageUrl 

            }
        });

        publishBtn?.addEventListener("click", async () => {
            formPost.desc = caption?.value || "";
            console.log("Formulario:", formPost);
        
            alert("Publicación realizada");
            this.resetForm();
        });

        this.shadow.appendChild(imgInput);
    }

    resetForm() {
        const caption = this.shadow.querySelector('.caption') as HTMLTextAreaElement;
        caption.value = "";
        formPost.desc = "";
        formPost.img = "";
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                /* ... tus estilos aquí, los dejo igual ... */
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
                        <input type= "text" class = "caption" placeholder="Escribe aqui...."></input>
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
customElements.define("create-post", CreatePost);
export default CreatePost;
