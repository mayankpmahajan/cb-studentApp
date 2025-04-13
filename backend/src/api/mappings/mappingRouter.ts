import {Router} from 'express';
import { dropdownController } from './mappingController';


const mappingRouter = Router();

mappingRouter.get("/dropdown", dropdownController)


export default mappingRouter;