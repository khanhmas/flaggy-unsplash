import { Router, Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import unsplash from './../libs/unsplash';
import { CustomPhoto, photoGenerator } from '../libs/photo_generator';

/**
 * Import the static data below for local test
 */
import testData from './../test_data';
import portraitData from './../portrait_data';
import landscapeData from './../landscape_data';
import squarishData from '../squarish_data';

export const localSearch: (
    req: Request,
    res: Response,
    next: NextFunction
) => void = (req: Request, res: Response, next: NextFunction) => {
    const page: number = +(req.query.page as string);
    const results: Array<any> = [
        squarishData.results,
        portraitData.results,
        landscapeData.results,
        testData.results,
    ];
    if (page <= results.length) {
        const customSizePhotos: Array<Photos> = results[page - 1].map(
            photoGenerator
        );

        res.status(200).send({
            results: customSizePhotos,
        });
    } else {
        res.status(500).send({
            message: 'An error is occured in unsplash api',
        });
    }
};

export const prodSearch: (
    req: Request,
    res: Response,
    next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
    const page: number = +(req.query.page as string);
    try {
        const result: ApiResponse<Photos> = await unsplash.search.getPhotos({
            query: req.query.q as string,
            /**
             *  according to observation, the maximum result
             * returned from Unsplash Api is 30
             * default: 10
             */
            perPage: 30,
            page,
        });
        if (result.type === 'success') {
            const photos: Photos = result.response;
            const customSizePhotos: Array<CustomPhoto> = photos.results.map(
                photoGenerator
            ) as Array<CustomPhoto>;
            res.status(200).send({
                total: photos.total,
                total_pages: photos.total_pages,
                results: customSizePhotos,
            });
        } else throw new Error(JSON.stringify(result.errors));
    } catch (err) {
        res.status(500).send(err);
    }
};

export const localDownload: (
    req: Request,
    res: Response,
    next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
    console.log('localDownload: ', req.body.link);
    res.status(200).send(`localDownload: ${req.body.link}`);
};

export const prodDownload: (
    req: Request,
    res: Response,
    next: NextFunction
) => void = async (req: Request, res: Response, next: NextFunction) => {
    const downloadLocation: string = req.body.link;
    const trackResponse: ApiResponse<{
        url: string;
    }> = await unsplash.photos.trackDownload({
        downloadLocation,
    });
    res.status(trackResponse.status).send(trackResponse);
};

export default (() => {
    return process.env.NODE_ENV!.indexOf('production') >= 0 ? {
        search: prodSearch,
        download: prodDownload,
    } : {
        search: localSearch,
        download: localDownload
    };
})();
