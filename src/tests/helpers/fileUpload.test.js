import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: import.meta.env.VITE_CLOUDINARY_BUCKET,
    api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
    api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    secure: true,
})

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {
        // const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        // const resp = await fetch(imageUrl);
        // const blob = await resp.blob();
        // const file = new File([blob], 'picture.jpg');

        const dummyImgData = fs.readFileSync(path.join(__dirname, '../fixtures/images/note.png'))
        const fbParts = [
            new Blob([dummyImgData], {
              type: 'image/jpg'
            }),
            ' Same way as you do with blob',
            new Uint16Array([999999999999999])
        ]
        const file = new File(fbParts, 'note.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
    });

    test('debe de retornar null', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
})
