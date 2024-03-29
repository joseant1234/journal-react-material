export const fileUpload = async(file) => {
    // if (!file) throw new Error('No tenemos ningun archivo a subir');
    if (!file) return null;

    const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_BUCKET}/upload`;

    const formData = new FormData();
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        // throw new Error(error.message);
        return null;
    }
}
