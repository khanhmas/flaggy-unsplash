import { Basic } from 'unsplash-js/dist/methods/photos/types';

export interface CustomPhoto extends Basic {
    classSize: string;
    width: number;
    height: number;
    canvasWidth: number;
    canvasHeight: number;
}

export const photoGenerator: (photo: Basic) => CustomPhoto = (
    photo: Basic
): CustomPhoto => {
    const dice: number = Math.floor(Math.random() * 20);
    let width: number = 1080;
    let height: number = 1080;
    let canvasWidth: number = 64;
    let canvasHeight: number = 64;
    let classSize: string = 'row-span-2 col-span-2';
    let ar: string = '1:1';

    if (dice <= 5) {
        width /= 2;
        height /= 2;
        canvasWidth /= 2;
        canvasHeight /= 2;
        classSize = '';
    } else if (dice > 5 && dice <= 10) {
        height /= 2;
        canvasHeight /= 2;
        classSize = 'col-span-2';
        ar = '2:1';
    } else if (dice > 10 && dice <= 15) {
        width /= 2;
        canvasWidth /= 2;
        classSize = 'row-span-2';
        ar = '1:2';
    }
    return {
        ...photo,
        urls: {
            ...photo.urls,
            raw: [
                photo.urls.raw,
                'ar=' + ar,
                'fm=png',
                'fit=crop',
                'auto=format',
                'w=' + width,
                'h=' + height,
                'q=100',
            ].join('&'),
        },
        classSize,
        width,
        height,
        canvasWidth,
        canvasHeight,
    };
};
