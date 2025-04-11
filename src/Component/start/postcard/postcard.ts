
interface Comment {
    user: string;
    text: string;
  }
  interface PostData {
    id: number;
    user: { name: string; avatar: string };
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
     this.attachShadow({ mode: 'open' });
    }
  
    async connectedCallback() {
      const id = Number(this.getAttribute('data-id') ?? '1');
      
      try {
        const res = await fetch('data/posts.json');
        const posts: PostData[] = await res.json();
        this.data = posts.find(p => p.id === id)!;
      } catch (error) {
        console.error("Error al cargar posts.json:", error);
        return;
      }
  
      this.render();
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
      this.data.comments.push({ user: 'Tú', text });
      this.updateComments();
    }
  
    private render() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/postcard.css';
      this.shadowRoot!.appendChild(link);
  
      this.shadowRoot!.innerHTML += `
        <article class="card">
          <header class="header">
            <img class="avatar" src="${this.data.user.avatar}" alt="${this.data.user.name}">
            <span class="username">${this.data.user.name}</span>
          </header>
  
          <img class="main-img" src="${this.data.image}" alt="post image">
  
          <p class="text">${this.data.text}</p>
  
          <section class="actions">
            <button id="likeBtn"  class="icon-btn like"  title="Me gusta"></button>
            <span   id="likesCount" class="count">${this.data.likes}</span>
            <button id="saveBtn"  class="icon-btn save"  title="Guardar"></button>
            <button id="shareBtn" class="icon-btn share" title="Compartir"></button>
          </section>
  
          <section class="comments" id="commentsContainer"></section>
        </article>
      `;
  
    this.shadowRoot!.getElementById('likeBtn')!
      .addEventListener('click', () => this.toggleLike());
    this.shadowRoot!.getElementById('saveBtn')!
      .addEventListener('click', () => this.toggleSave());
    this.shadowRoot!.getElementById('shareBtn')!
      .addEventListener('click', () => alert('Compartido (simulado)'));
  

      const commentsDiv = this.shadowRoot!.getElementById('commentsContainer')!;
      const inputWrap = document.createElement('div');
      inputWrap.classList.add('comment-input');
      inputWrap.innerHTML = `
        <input type="text" placeholder="Añade un comentario..." />
        <button>Publicar</button>
      `;
      commentsDiv.appendChild(inputWrap);
  
      const input = inputWrap.querySelector('input') as HTMLInputElement;
      const btn = inputWrap.querySelector('button')!;
      btn.addEventListener('click', () => {
        this.addComment(input.value);
        input.value = '';
      });
  
      this.updateActions();
      this.updateComments();
    }
  
    private updateActions() {
      const likeBtn = this.shadowRoot!.getElementById('likeBtn') as HTMLButtonElement;
      const saveBtn = this.shadowRoot!.getElementById('saveBtn') as HTMLButtonElement;  
  
      likeBtn.classList.toggle('on', this.data.liked);
      saveBtn.classList.toggle('on', this.data.saved);
  
      this.shadowRoot!.getElementById('likesCount')!.textContent = String(this.data.likes);
    }
  
    private updateComments() {
      const container = this.shadowRoot!.getElementById('commentsContainer')!;
      [...container.querySelectorAll('.comment')].forEach(el => el.remove());
      this.data.comments.forEach(c => {
        const p = document.createElement('p');
        p.classList.add('comment');
        p.innerHTML = `<span class="author">${c.user}</span>${c.text}`;
        container.insertBefore(p, container.firstChild);
      });
    }
  }
  
  export default PostCard;
  