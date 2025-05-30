export interface SuggestionData {
    id: number;
    name: string;
    avatar: string;
    description: string;
    followers: number;
  }
  
  export default class SuggestionCard extends HTMLElement {
    private suggestions: SuggestionData[] = [];
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      try {
        const res = await fetch("/data/suggestions.json");
        this.suggestions = await res.json();
      } catch (error) {
        console.error("Error al cargar /data/suggestions.json:", error);
        return;
      }
      this.render();
    }
  
    private render() {

      const cardsHTML = this.suggestions
        .map((item) => {
          return `
            <div class="suggestion-card" data-sugid="${item.id}">
              <img class="avatar" src="${item.avatar}" alt="${item.name}">
              <div class="suggestion-content">
                <h3 class="name">${item.name}</h3>
                <p class="description">${item.description}</p>
                <span class="followers">${item.followers} seguidores</span>
              </div>
            </div>
          `;
        })
        .join("");
  
      this.shadowRoot!.innerHTML += `
        <style>
            .suggestions-box {
  background: #fff;
  border: 2px solid #c45656;
  border-radius: 15px;
  margin: 0;
  padding: 1.2rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  
}

.section-title {
  margin: 0 0 4rem 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #c45656;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.suggestion-card {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    max-width: 300px;
    background: #fff;
    border: 1px solid #c45656;
    border-radius: 10px;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .suggestion-card:hover {
    transform: scale(1.02);
  }
  
  .suggestion-card .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .suggestion-content {
    display: flex;
    flex-direction: column;
  }
  
  .name {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #c45656;
  }
  
  .description {
    margin: 0.2rem 0 0.4rem;
    font-size: 0.9rem;
    color: #341515;
  }
  
  .followers {
    font-size: 0.8rem;
    color: #999;
  }
  
        </style>

        <section class="suggestions-box">
          <h2 class="section-title">Sugerencias</h2>
          <div class="cards-container">
            ${cardsHTML}
          </div>
        </section>
      `;

      const allCards = this.shadowRoot!.querySelectorAll(".suggestion-card");
      allCards.forEach((cardEl) => {
        cardEl.addEventListener("click", () => {
          const sugId = cardEl.getAttribute("data-sugid");
          const sugData = this.suggestions.find((s) => String(s.id) === sugId);
          if (sugData) {
            console.log(`Se hizo click en la sugerencia: ${sugData.name}`);
          }
        });
      });
    }
  }
  
