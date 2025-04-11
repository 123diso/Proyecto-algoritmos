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
      const res = await fetch("data/posts.json");
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


    this.shadowRoot!.innerHTML += `
      <article class="horizontal-card">
        <div class="image-side">
          <img class="main-img" src="${this.data.image}" alt="Post Image">
        </div>
        <div class="content-side">
          <header class="header">
            <img class="avatar" src="${this.data.user.avatar}" alt="${this.data.user.name}">
            <span class="username">${this.data.user.name}</span>
          </header>
          <p class="text">${this.data.text}</p>
          <section class="actions">
            <button id="likeBtn" class="icon-btn like" title="Me gusta"></button>
            <span id="likesCount" class="count">${this.data.likes}</span>
            <button id="saveBtn" class="icon-btn save" title="Guardar"></button>
            <button id="shareBtn" class="icon-btn share" title="Compartir"></button>
          </section>
          <section class="comments" id="commentsContainer"></section>
          <div class="comment-input">
            <input type="text" placeholder="Añade un comentario..." />
            <button id="publishBtn">Publicar</button>
          </div>
        </div>
      </article>
    `;

    this.shadowRoot!.getElementById("likeBtn")!
      .addEventListener("click", () => this.toggleLike());
    this.shadowRoot!.getElementById("saveBtn")!
      .addEventListener("click", () => this.toggleSave());
    this.shadowRoot!.getElementById("shareBtn")!
      .addEventListener("click", () => alert("Compartido (simulado)"));
    this.shadowRoot!.getElementById("publishBtn")!
      .addEventListener("click", () => {
        const input = this.shadowRoot!.querySelector(".comment-input input") as HTMLInputElement;
        this.addComment(input.value);
        input.value = "";
      });

    this.updateActions();
    this.updateComments();
  }

  private toggleLike() {
    this.data.liked = !this.data.liked;
    this.data.likes += this.data.liked ? 1 : -1;
    this.updateActions();
  }

  private toggleSave() {
    this.data.saved = !this.data.saved;
    this.updateActions();
  }

  private addComment(text: string) {
    if (!text.trim()) return;
    const newComment: Comment = {
      user: "Tú",
      avatar: "/assets/icons/ElipseProfile.png",
      text: text,
      time: "Ahora",
      likes: 0,
      liked: false
    };
    this.data.comments.push(newComment);
    this.updateComments();
  }

  private updateActions() {
    const likeBtn = this.shadowRoot!.getElementById("likeBtn") as HTMLButtonElement;
    const saveBtn = this.shadowRoot!.getElementById("saveBtn") as HTMLButtonElement;
    likeBtn.classList.toggle("on", this.data.liked);
    saveBtn.classList.toggle("on", this.data.saved);
    this.shadowRoot!.getElementById("likesCount")!.textContent = String(this.data.likes);
  }

  private updateComments() {
    const container = this.shadowRoot!.getElementById("commentsContainer")!;
    container.innerHTML = "";
    this.data.comments.forEach(c => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `
        <img class="comment-avatar" src="${c.avatar}" alt="${c.user}">
        <div class="comment-content">
          <div class="comment-header">
            <span class="author">${c.user}</span>
            <span class="time">${c.time}</span>
          </div>
          <p class="comment-text">${c.text}</p>
          <div class="comment-actions">
            <button class="comment-like ${c.liked ? "on" : ""}">
              <img class="like-icon" src="${c.liked ? '/assets/icons/megusta.svg' : '/assets/icons/megustainactiv.svg'}" alt="like icon">
              <span class="like-count">${c.likes}</span>
            </button>
          </div>
        </div>
      `;
      container.appendChild(commentDiv);
      const likeBtn = commentDiv.querySelector(".comment-like") as HTMLButtonElement;
      const likeIcon = commentDiv.querySelector(".like-icon") as HTMLImageElement;
      likeBtn.addEventListener("click", () => {
        c.liked = !c.liked;
        if (c.liked) {
          c.likes++;
        } else {
          c.likes--;
        }
        likeBtn.classList.toggle("on", c.liked);
        likeIcon.src = c.liked ? '/assets/icons/megusta.svg' : '/assets/icons/megustainactiv.svg';
        const likeCountSpan = likeBtn.querySelector(".like-count");
        if (likeCountSpan) {
          likeCountSpan.textContent = String(c.likes);
        }
      });
    });
  }
}

export default PostCard;

