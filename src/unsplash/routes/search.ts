import { Router } from 'express';
import searchUtils from '../utils/search';

const router: Router = Router();

/**
 * Later, make and import a function reference depending on NODE_ENV
 */
router.get(
    '/search',
    searchUtils.search
);

router.post(
    '/trackdownload',
    searchUtils.download
);

export default router;
