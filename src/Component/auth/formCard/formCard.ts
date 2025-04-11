class formCard extends HTMLElement{
    shadow: ShadowRoot;
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    render(): void {
        const cardContainer: HTMLDivElement = document.createElement('div');
        cardContainer.classList.add('card-container');
        this.shadow.appendChild(cardContainer);
    }
}

export default formCard;