class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    console.log('Header');
    }

    connectedCallback(){
        if(this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
          * {
            margin: 0;
            padding: 0;
        }

        .container {
            display: flex;


        .Whitecontainer{
            display: flex;
            justify-content: space-evenly;
            flex-direction: row;
            width: 100%;
            height: 100vh;
            background-color: #fdf4f5;
            corner-radius: 100px;
        }



        </style>



    <div class="container">
        <app-sidebar></app-sidebar>

        <div class="Whitecontainer">
        
            <simple-navbar></simple-navbar>
            <profile-component></profile-component>
        </div>
    </div>
            `
        }
        

    }
}

export default Root;