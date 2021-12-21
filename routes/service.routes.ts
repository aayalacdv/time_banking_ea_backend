import { Router } from "express";
import { createServiceHandler, getAllServicesHandler } from "../src/controller/service.controller";

const router : Router = Router(); 


router.get('/',getAllServicesHandler); 
router.post('/',createServiceHandler); 
router.put('/');


export default router; 

