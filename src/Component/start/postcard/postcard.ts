interface Comment {
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean; 
}

interface PostData {
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

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const id = Number(this.getAttribute("data-id") ?? "1");
    try {
      const res = await fetch("/data/posts.json");
      const posts: PostData[] = await res.json();
      this.data = posts.find(p => p.id === id)!;
    } catch (error) {
      console.error("Error al cargar posts.json:", error);
      return;
    }
    this.render();
  }

  private render() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/postcard.css";
    this.shadowRoot!.appendChild(link);

    const postTime = this.data.timePost ?? "Hace un momento";

    this.shadowRoot!.innerHTML += `
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

