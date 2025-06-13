export async function getSidebarMenuItems() {
return  await fetch('/assets/sidebar.json')
    .then((res) => {
    if (!res.ok) {
        throw new Error('Error al obtener el menú');
    }
    return res.json();
    })
    .catch((error) => {
    console.error('No se pudo cargar el menú:', error);
    });
}

import FormLogin  from "../Component/auth/login"
export function logueado ( data : FormLogin ) {
    console.log ("usuario loguear", data )
};
