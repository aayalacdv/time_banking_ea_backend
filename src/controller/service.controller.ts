import { Service} from './../models/service.model';
import { Request, Response } from "express";
import { addComment, addRating, buyService, createService, deleteServiceById, findAllServices, updateServiceById } from '../services/service.service';
import { findUserByEmail, updateUser } from '../services/user.service';
import { IUser } from '../models/user.model';



export async function createServiceHandler( req: Request, res: Response){
    
    let service : Service = JSON.parse(req.body.service); 
    console.log(service);

    //@ts-ignore
    service.img_url = 'service_'+req.user.email+'.jpeg';

    //@ts-ignore
    let user : any = await findUserByEmail(req.user.email);
    const created : any = await createService(service);

    user?.services.push(created._id);
    await updateUser(user._id, user);

    if(created) return res.status(200).json(created); 
    return res.status(400).send({message: 'Error creating service'});
}


export async function addRatingHandler( req: Request, res: Response){
    const servId = req.params.id; 
    const { rating } : { rating : number }= req.body; 
    await addRating(servId, rating); 
    res.status(200).send('Success');

}

export async function addCommentHandler( req: Request, res: Response) {
    const servId = req.params.id; 
    const { comment } : { comment : string }= req.body; 
    await addComment(servId, comment); 
    res.status(200).send('Success');


}

export async function buyServiceHandler( req: Request, res : Response ){
    const { servId, userId} = req.params; 
    await buyService(servId, userId); 
    res.status(200).send('Success');

}

export async function getAllServicesHandler( req: Request, res: Response){
    const services = await findAllServices(); 
    res.status(200).json(services); 

}
export async function updateServiceHandler( req: Request, res: Response){
    const service : Service = req.body; 
    const updated = await updateServiceById(service); 
    if( updated) res.status(200).send(updated);


}

export async function deleteServiceHandler( req: Request, res: Response){
    const id = req.params.id; 
    const deleted = await deleteServiceById(id);
    if(deleted) return res.status(200).send(deleted); 
    
}