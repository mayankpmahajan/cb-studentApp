import {Router} from 'express';
import { onboardingController } from './studentController';



const studentRouter = Router();

studentRouter.post("/onboarding", onboardingController)


export default studentRouter;