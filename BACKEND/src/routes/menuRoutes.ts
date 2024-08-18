import { Router } from 'express';
import { createMenu, getMenuById, getAllMenus, updateMenu, deleteMenu } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus/:id', getMenuById);
router.get('/menus', getAllMenus);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

export default router;