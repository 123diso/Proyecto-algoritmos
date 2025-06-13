import { PostService } from "../../../service/postService";
import { store } from "../../../flux/Store";
import { Post, Comment } from "../../../types/post";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../service/firebase";

class PostCard extends HTMLElement {
  private postId: string;
  private post: Post | null = null;
  private userId: string;
  private unsubscribe: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.postId = this.getAttribute('data-id') || '';
    this.userId = store.getState().uid;
    this.unsubscribe = () => {};
  }

  async connectedCallback() {
    await this.loadPost();
    this.render();
    this.setupEventListeners();

    // Escuchar cambios en tiempo real
    this.setupRealtimeListener();
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  private async loadPost() {
    try {
      this.post = await PostService.getPostWithComments(this.postId);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  }

  private setupRealtimeListener() {
    if (!this.postId) return;

    // Clean up previous listener if it exists
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    const postRef = doc(db, 'posts', this.postId);
    this.unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        this.post = {
          id: doc.id,
          ...doc.data()
        } as Post;
        this.render();
        this.setupEventListeners();
      }
    });
  }

  private render() {
    if (!this.post || !this.shadowRoot) return;

    const isLiked = this.post.likedBy?.includes(this.userId) || false;
    const isSaved = false; // Implementa guardado si lo necesitas

    this.shadowRoot!.innerHTML = `
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
.content-side {
  max-height: 400px; 
  overflow-y: auto;
}

.comments {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 120px; 
  margin-bottom: 1rem;
}
  
    </style>

    <article class="horizontal-card">
                <div class="image-side">
                    <img class="main-img" src="${this.post.imageUrl || ''}" alt="Imagen del post">
                </div>
                <div class="content-side">
                    <header class="header">
                        <img class="avatar" src="${store.getState().avatar || './assets/icons/ElipseProfile.png'}" alt="${this.post.user}">
                        <div class="header-info">
                            <span class="username">${this.post.user}</span>
                            <span class="post-meta">
                                ${this.formatDate(this.post.createdAt)} • ${this.post.place || ''}
                            </span>
                        </div>
                    </header>
                    <p class="text">${this.post.content}</p>
                    <div class="post-meta">
                        <span class="likes">${this.post.likes} me gusta</span>
                    </div>
                    
                    <section class="comments" id="commentsContainer">
                        ${this.renderComments()}
                    </section>
                    
                    <section class="actions">
                        <button id="likeBtn" class="icon-btn like ${isLiked ? 'on' : ''}" title="Me gusta"></button>
                        <button id="shareBtn" class="icon-btn share" title="Compartir"></button>
                        <button id="saveBtn" class="icon-btn save ${isSaved ? 'on' : ''}" title="Guardar"></button>
                    </section>
                    
                    <div class="comment-input">
                        <input type="text" id="commentInput" placeholder="Añade un comentario..." />
                        <button id="publishBtn">Publicar</button>
                    </div>
                </div>
            </article>
        `;
  }

  private renderComments(): string {
    if (!this.post?.comments?.length) return '<p>No hay comentarios aún</p>';

    return this.post.comments.map(comment => `
            <div class="comment" data-comment-id="${comment.id}">
                <div class="comment-left">
                    <img class="comment-avatar" src="${comment.avatar}" alt="${comment.user}">
                </div>
                <div class="comment-right">
                    <div class="comment-header">
                        <span class="author">${comment.user}</span>
                        <button class="comment-like ${comment.likedBy?.includes(this.userId) ? 'on' : ''}" 
                                data-comment-id="${comment.id}"></button>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                    <div class="comment-meta">
                        <span class="time">${this.formatDate(comment.createdAt)}</span>
                        <span class="comment-likes">${comment.likes} me gusta</span>
                    </div>
                </div>
            </div>
        `).join('');
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  private setupEventListeners() {
    // Like del post
    this.shadowRoot?.getElementById("likeBtn")?.addEventListener("click", async () => {
      if (!this.post) return;

      try {
        const newLikes = await PostService.toggleLike(this.post.id, this.userId);
        this.post.likes = newLikes;

        // Actualizar visualmente el like
        const likeBtn = this.shadowRoot?.getElementById("likeBtn");
        if (likeBtn) {
          const isLiked = this.post.likedBy?.includes(this.userId) || false;
          likeBtn.classList.toggle('on', isLiked);

          // Actualizar contador
          const likesCounter = this.shadowRoot?.querySelector('.likes');
          if (likesCounter) {
            likesCounter.textContent = `${newLikes} me gusta`;
          }
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    });

    // Comentario nuevo
    this.shadowRoot?.getElementById("publishBtn")?.addEventListener("click", async () => {
      const input = this.shadowRoot?.getElementById("commentInput") as HTMLInputElement;
      const commentText = input.value.trim();

      if (!commentText || !this.post) return;

      try {
        const newComment: Comment = {
          id: `${this.userId}_${Date.now()}`,
          userId: this.userId,
          user: store.getState().username,
          avatar: './assets/icons/ElipseProfile.png',
          text: commentText,
          createdAt: new Date().toISOString(),
          likes: 0,
          likedBy: []
        };

        await PostService.addComment(this.post.id, newComment);

        // Recargar el post con los nuevos comentarios
        await this.loadPost();
        this.render();
        this.setupEventListeners();

        input.value = ''; // Limpiar el input
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    });

    // Likes de comentarios
    this.shadowRoot?.querySelectorAll('.comment-like').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const commentId = (e.currentTarget as HTMLElement).getAttribute('data-comment-id');
        if (!commentId || !this.post) return;

        try {
          // Implementa la lógica para likes en comentarios similar a los posts
          console.log("Like en comentario:", commentId);
        } catch (error) {
          console.error("Error toggling comment like:", error);
        }
      });
    });
  }
}

export default PostCard;

