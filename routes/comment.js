import { Router } from 'express';

import checkToken from '../middleware/checkToken.js';
import controllers from '../controllers/controllers.Comment.js';

// import validate from '../middleware/validate.js';
// import schemaBook from '../schemas/book.js';

const router = Router();

router.post('/review/:id', checkToken, controllers.createComment);
router.get('/show/:id', checkToken, controllers.getComments);
export default router;
