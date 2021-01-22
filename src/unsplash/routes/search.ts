import {Router, Request, Response} from 'express';
import unsplash from './../libs/unsplash';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log(unsplash);
    res.status(200).json({res: 'hello world'});
});

export default router;
