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
            res.status(200).send({
                results: [...results[page - 1]],
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
