class CategoryCarousel extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    }
    async connectedCallback() {
        try {
        const response = await fetch('/assets/categories.json'); 
        const categories: { img: string; link: string }[] = await response.json();

    this.shadow.innerHTML = `
        <style>
        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 15px;
            max-width: fit-content;
            margin: 0 auto;
            padding: 20px;
            
        }
        
        .carousel-container {
            overflow: hidden;
            width: 56vh;
            border-radius: 15px;
            background: white;
            padding: 5px;
        }
        .carousel {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 10px 5px;
            height: 65px;
            align-items: center;
        }
        .carousel::-webkit-scrollbar {
            height: 8px;
        }
        .carousel::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
            margin: 0 10px;
        }
        .carousel::-webkit-scrollbar-thumb {
            background: #e57373;
            border-radius: 10px;
            transition: background 0.3s;
        }
        .carousel::-webkit-scrollbar-thumb:hover {
            background:rgb(228, 96, 96);
        }
        .item {
            flex: 0 0 auto;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid #C45656;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .item:hover {
            transform: scale(1.1);
            
        }
        img {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }
            .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        
        .title {
            font-family: Arial, sans-serif;
            color: #C45656;
            margin: 0 0 15px 0;
            font-size: 1.2rem;
        }
        </style>
        <div class="main-container">
        <div class="header"> 
        <h3 class="title">Categorías</h3>
        </div>
        <div class="carousel-container">
            <div class="carousel" id="carousel">
            ${categories
                .map(
                (cat) => `
                    <div class="item" data-link="${cat.link}">
                    <img src="${cat.img}" alt="category" />
                    </div>
                `
                )
                .join('')}
            </div>
        </div>
        </div>
    `;
    this.shadow.querySelectorAll('.item').forEach((item) => {
        item.addEventListener('click', () => {
        const link = item.getAttribute('data-link');
        if (link) window.location.href = link;
        });
    });

    } catch (error) {
    console.error('Error al cargar categorías:', error);
    this.shadow.innerHTML = `<p>Error al cargar categorías.</p>`;
    }
}
}

export default CategoryCarousel;

