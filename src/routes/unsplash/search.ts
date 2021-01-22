import {Router, Request, Response} from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('hello world');
});

export default router;
