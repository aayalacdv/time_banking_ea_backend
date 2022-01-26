import { Router } from "express";
import { createServiceHandler, getAllServicesHandler } from "../src/controller/service.controller";
import { Service } from "../src/models/service.model";
import { uploadService } from "../src/multer/multer.setup";

const router : Router = Router(); 


router.get('/',getAllServicesHandler); 
router.post('/',uploadService.single('picture'),createServiceHandler); 


export default router; 

