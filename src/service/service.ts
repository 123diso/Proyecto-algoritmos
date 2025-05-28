export function getSidebarMenuItems() {
return fetch('/assets/sidebar.json')
    .then((res) => {
    if (!res.ok) {
        throw new Error('Error al obtener el menú');
    }
    return res.json();
    })
    .catch((error) => {
    console.error('No se pudo cargar el menú:', error);
    return [];
    });
}

import { FormLogin } from "../Component/auth/login"
export function logueado ( data : FormLogin ) {
    console.log ("usuario loguear", data )
};


export async function uploadToCloudinary(file: File) {
  const url = 'https://api.cloudinary.com/v1_1/dmfxilia1/image/upload';
  const preset = 'Nibble';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.secure_url; 
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
    }
}

