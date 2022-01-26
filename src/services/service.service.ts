import { array } from "yup";
import { Service, ServiceModel } from "../models/service.model";
import { IUser } from "../models/user.model";
import { findUserById, updateUser } from "./user.service";


export async function createService ( service : Service){
    return ServiceModel.create(service).catch((error : any) => {
        console.log("Error creating service ",error); 
    }) 

}

export async function findService( serviceId : string ){
    return ServiceModel.findById(serviceId).catch((error : any) => {
        console.log("Error finding service "); 
    }) 
}


export async function findAllServices(){
    return ServiceModel.find().catch((error : any) => {
        console.log("Error finding all"); 
    })
}


export async function deleteServiceById( serviceId : string){
    return ServiceModel.findByIdAndDelete( serviceId).catch((error : any) => {
        console.log("Error deleting service"); 
    })
}

export async function updateServiceById( updated : Service){
    return ServiceModel.findByIdAndUpdate( updated._id, updated, { new: true }).catch((error : any) => {
        console.log("Error updating service"); 
    });
}

export async function addComment( id : string , comment: string ) {
    let service : any = await findService(id);

    service.comments.push(comment);

    return await updateServiceById( service as Service);
    
}

export async function addRating ( id : string , valoracion: number) {
    let service : any = await findService(id);

    console.log(service);


    let mean = 0;
    service.ratings.push(valoracion);
    service.ratings.forEach((element : number ) => {
       mean = mean + element;
    });
    mean = mean / service.ratings.length; 
    service.meanRate = mean;

    return await updateServiceById( service as Service);
    
}

export async function buyService ( serviceId: string, userId: string ){
    let found : any = await findService(serviceId); 
    let buyer : IUser = await findUserById(userId); 

    let owner : IUser = await findUserById((found as Service).username);

    owner.time += (found as Service).time_cost;
    buyer.time -= (found as Service).time_cost;

    await updateUser(owner.id,owner); 
    await updateUser(buyer.id,buyer); 
    await updateServiceById(found as Service); 
    
}