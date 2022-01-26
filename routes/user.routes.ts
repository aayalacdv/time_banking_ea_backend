import { Router } from 'express'; 
import { createUserHandler, deleteUserByIdHandler, getAllUsersHandler, getUserByIdHandler,updateProfilePictureHandler ,googleAuthHandler, loginHandler, logOutHandler, updateUserHandler } from '../src/controller/user.controller';
import { requeriesUser } from '../src/middleware/requiresUser';
import { validateUser } from '../src/middleware/user.validate';
import { userSchema } from '../src/schemas/user.schema';
import upload, { uploadService } from '../src/multer/multer.setup';
import { addCommentHandler, addRatingHandler, buyServiceHandler, createServiceHandler } from '../src/controller/service.controller';

const router = Router();  


router.post('/google', googleAuthHandler); 
//Get all users
router.get("/", getAllUsersHandler);

//Create a user
router.post("/", validateUser(userSchema),createUserHandler);

//login user
router.post("/login",loginHandler); 
  
//Get user by Id
router.get("/:id", getUserByIdHandler);


//Operations requiring user
router.use(requeriesUser); 

//Logout User
router.delete("/logout",logOutHandler);

//Update user by Id
router.put("/:id", updateUserHandler);
router.put("/profilepic/:id", upload.single('profilePicture'), updateProfilePictureHandler );

//Delete user by Id
router.delete("/:id", deleteUserByIdHandler);
router.post('/serv',uploadService.single('picture'),createServiceHandler); 
router.put('/serv/rating/:id',addRatingHandler); 
router.put('/serv/comment/:id',addCommentHandler); 
router.put('/serv/buy/:servId/:userId',buyServiceHandler); 

export default router; 