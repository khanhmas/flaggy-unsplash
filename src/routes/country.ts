import { NextFunction, Request, Response, Router } from 'express';
import countries from './../data/countries';

const router: Router = Router();

router.get(
    '/all',
    (req: Request, res: Response, next: NextFunction): void => {
        res.status(200).send(countries);
    }
);

export default router;
