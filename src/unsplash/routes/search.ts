import { Router, Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import unsplash from './../libs/unsplash';
import testData from './../test_data';
import portraitData from './../portrait_data';
import landscapeData from './../landscape_data';
import squarishData from '../squarish_data';

const router: Router = Router();

router.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.query);
        const page: number = +(req.query.page as string);
        // try {
        //     const result: ApiResponse<Photos> = await unsplash.search.getPhotos(
        //         {
        //             query: req.query.q as string,
        //             perPage: 30,
        //             // orientation: 'portrait',
        //             // orientation: 'landscape',
        //             orientation: 'squarish',
        //         },
        //         { signal }
        //     );
        //     res.status(200).send(result.response);
        // } catch (err: any) {
        //     res.status(500).send('message': 'An error is occured in unsplash api');
        // }
        const results: Array<any> = [
            squarishData.results,
            portraitData.results,
            landscapeData.results,
            testData.results,
        ];
        if (page <= results.length) {
            const customSizePhotos: Array<Photos> = results[page - 1].map(
                (photo: {urls: {raw: string}}) => {
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
                        canvasHeight /=2;
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
                        canvasHeight
                    };
                }
            );

            res.status(200).send({
                results: customSizePhotos,
            });
        } else {
            res.status(500).send({
                message: 'An error is occured in unsplash api',
            });
        }
        // const downloadLink: ApiResponse<{
        //     url: string;
        // }> = await unsplash.photos.trackDownload({
        //     downloadLocation: testData.results[0].links.download_location,
        // });
        // console.log(downloadLink);
    }
);

export default router;
