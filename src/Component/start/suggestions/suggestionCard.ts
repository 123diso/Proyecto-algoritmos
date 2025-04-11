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
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/suggestionCard.css";
      this.shadowRoot!.appendChild(link);

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
  
