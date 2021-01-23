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
        console.log(req.query.q);
        // const result: ApiResponse<Photos> = await unsplash.search.getPhotos({
        //     query: req.query.q as string,
        //     perPage: 30,
        //     // orientation: 'portrait',
        //     // orientation: 'landscape',
        //     orientation: 'squarish',
        // });
        // res.status(200).send(result.response);
        res.status(200).send(squarishData);
    }
);

export default router;
