interface Comment {
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean; 
}

export interface PostData {
  id: number;
  user: {        
    name: string;
    avatar: string;
  };
  image: string;  
  text: string;    
  likes: number;
  saved: boolean;
  liked: boolean; 
  timePost?: string;
  comments: Comment[];
}

class PostCard extends HTMLElement {
  private data!: PostData;

  posts = JSON.parse(localStorage.getItem('posts') || '[]');

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const id = Number(this.getAttribute("data-id") ?? "1");

    if (id === 1){
      try {
      const res = await fetch("/data/posts.json");
      const posts: PostData[] = await res.json();
      this.data = posts.find(p => p.id === id)!;
      } catch (error) {
        console.error("Error al cargar posts.json:", error);
        return;
      }
    } else {
      const post = this.posts.find((p: PostData) => p.id === id)
      if (post){
        this.data = post;
      }
    }
    this.render();
  }

  private render() {
    const postTime = this.data.timePost ?? "Hace un momento";

    this.shadowRoot!.innerHTML += `
    <style>
    .horizontal-card {
  display: flex;
  background: #fff;
  border: 3px solid #c45656;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,.05);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}

.image-side {
  flex: 1.2;
  overflow: hidden;
}
.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.content-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.3rem;
}
.header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.username {
  font-weight: 600;
  color: #c45656;
  font-size: 0.95rem;
  margin: 0;
}
.post-meta {
  font-size: 0.5rem;
  color: #999;
  margin: 0;
}

.text {
  margin: 0.5rem 0 0.3rem;
  font-size: 0.55rem;
  background-color: #ffefef;
  padding: 0.3rem;
  line-height: 1.2;
  color: #341515;
}

.comment {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.2rem;
  padding-top: 0.2rem;
  border-top: 1.5px solid #eee;
  align-items: center;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}
.comment-left {
  flex-shrink: 0;
}
.comment-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.comment-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.author {
  font-weight: 600;
  color: #c45656;
  font-size: 0.75rem;
  margin: 0;
}

.comment-text {
  margin: 0;
  font-size: 0.6rem;
  color: #341515;
  line-height: 1.4;
}

.comment-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.4rem;
}

.time {
  font-size: 0.5rem;
  color: #999;
  margin: 0;
}

.comment-likes {
  font-size: 0.5rem;
  color: #999;
}

.comment-like {
  width: 24px;
  height: 24px;
  background: url("assets/icons/megustainactiv.svg") no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transition: transform 0.1s, filter 0.2s;
}
.comment-like:hover {
  filter: brightness(1.2);
}
.comment-like:active {
  transform: scale(0.9);
}
.comment-like.on {
  background: url("assets/icons/megusta.svg") no-repeat center;
  background-size: contain;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.2rem 0 0.4rem;
}
.icon-btn {
  width: 12px;
  height: 12px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  transition: filter 0.2s, transform 0.1s;
}
.icon-btn:hover {
  filter: brightness(1.15);
}
.icon-btn:active {
  transform: scale(0.9);
}

.like {
  background: url("assets/icons/megustainactiv.svg") no-repeat center;
  background-size: contain;
}
.like.on {
  background: url("assets/icons/megusta.svg") no-repeat center;
  background-size: contain;
}
.share {
  background: url("assets/icons/compartir.svg") no-repeat center;
  background-size: contain;
}
.save {
  background: url("assets/icons/guardadoinactiv.svg") no-repeat center;
  background-size: contain;
}
.save.on {
  background: url("assets/icons/guardado.svg") no-repeat center;
  background-size: contain;
}
.extra-separator {
  margin: 0.3rem 0 0.8rem;
  border: none;
  border-top: 1px solid #eee;
}
.comment-input {
  display: flex;
  gap: 0.5rem;
}
.comment-input input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  font-size: 0.6rem;
}
.comment-input button {
  border: none;
  background: #c45656;
  color: #fff;
  border-radius: 20px;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: filter 0.2s;
}
.comment-input button:hover {
  filter: brightness(1.1);
}

@media (max-width: 768px) {
  .horizontal-card {
    flex-direction: column;
    max-width: 100%;
  }
  .image-side {
    width: 100%;
    height: auto;
  }
  .content-side {
    width: 100%;
  }
}
  
    </style>


      <article class="horizontal-card">
        <div class="image-side">
          <img class="main-img" src="${this.data.image}" alt="Imagen del post">
        </div>
        <div class="content-side">
          <header class="header">
            <img class="avatar" src="${this.data.user.avatar}" alt="${this.data.user.name}">
            <span class="username">${this.data.user.name}</span>
          </header>
          <p class="text">${this.data.text}</p>
          <div class="post-meta">
            <span class="time">${postTime}</span>
            <span class="likes">• ${this.data.likes} me gusta</span>
          </div>
          <section class="comments" id="commentsContainer"></section>
          <section class="actions">
            <button id="likeBtn" class="icon-btn like" title="Me gusta"></button>
            <button id="shareBtn" class="icon-btn share" title="Compartir"></button>
            <button id="saveBtn" class="icon-btn save" title="Guardar"></button>
          </section>
          <div class="comment-input">
            <input type="text" placeholder="Añade un comentario..." />
            <button id="publishBtn">Publicar</button>
          </div>
        </div>
      </article>
    `;

    this.shadowRoot!.getElementById("likeBtn")!
      .addEventListener("click", () => this.toggleLike());
    this.shadowRoot!.getElementById("shareBtn")!
      .addEventListener("click", () => alert("Compartido (simulado)"));
    this.shadowRoot!.getElementById("saveBtn")!
      .addEventListener("click", () => this.toggleSave());

    this.shadowRoot!.getElementById("publishBtn")!
      .addEventListener("click", () => {
        const input = this.shadowRoot!.querySelector(".comment-input input") as HTMLInputElement;
        this.addComment(input.value);
        input.value = "";
      });

    this.updateComments();
  }

  private toggleLike() {
    this.data.liked = !this.data.liked;
    console.log(`Post => like = ${this.data.liked}`);
  }

  private toggleSave() {
    this.data.saved = !this.data.saved;
    console.log(`Post => saved = ${this.data.saved}`);
  }

  private addComment(text: string) {
    if (!text.trim()) return;
    const newComment: Comment = {
      user: "Tú",
      avatar: "/assets/icons/Elipseprofile.png",
      text: text,
      time: "Ahora",
      likes: 0,
      liked: false
    };
    this.data.comments.push(newComment);
    this.updateComments();
  }

  private updateComments() {
    const container = this.shadowRoot!.getElementById("commentsContainer")!;
    container.innerHTML = "";

    this.data.comments.forEach((c, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      commentDiv.innerHTML = `
        <div class="comment-left">
          <img class="comment-avatar" src="${c.avatar}" alt="${c.user}">
        </div>
        <div class="comment-right">
          <span class="author">${c.user}</span>
          <p class="comment-text">${c.text}</p>
          <div class="comment-meta">
            <span class="time">${c.time}</span>
            <span class="comment-likes">${c.likes} me gusta</span>
          </div>
        </div>
      `;
      container.appendChild(commentDiv);

      if (index === 1) {
        const extraLine = document.createElement("hr");
        extraLine.classList.add("extra-separator");
        container.appendChild(extraLine);
      }
    });
  }
}
export default PostCard;

