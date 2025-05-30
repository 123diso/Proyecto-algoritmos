class EditProfileModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0,0);
            background-color: rgba(0,0,0,0.4);
            padding-top: 60px;
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border-radius: 15px;
            width: 80%;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        </style>

        <div class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Editar Perfil</h2>
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" value="Lupe Lopez">
                <label for="username">Nombre de usuario:</label>
                <input type="text" id="username" name="username" value="multiplocomun">
                <label for="description">Descripción:</label>
                <textarea id="description" name="description">Escribe tu descripción aquí...</textarea>
                <button type="button" class="cancel">Cancelar</button>
                <button type="button" class="save">Guardar</button>
            </div>
        </div>
      `;
    }
  }
}

export default EditProfileModal;