import { IUser, User, } from './user.model';
import { string } from "yup";
import { Schema, model, Document, SchemaTypes } from "mongoose";

export interface Service extends Document {
  username: IUser['_id'];
  description: string;
  time_cost: number;
  categories: string[];
  img_url: string; 
  ratings : number[];
  comments: string[];
  meanRate: number;
}

const serviceSchema = new Schema<Service>({
  username: { type: String, required: true },
  img_url: { type: String, unique: false},
  description: { type: String, required: true },
  time_cost: { type: Number, required: true },
  categories: [{ type: String }],
  comments:[{ type: String, unique: false, required: false}],
  ratings:[{type: Number}],
  meanRate: { type: Number, unique: false, required: false},
});

serviceSchema.post('save',async function(){
    const user = await User.findOne({ username : this.username}); 
    //add service to user service list
    if(user) user.services.push(this._id); 

})



export const ServiceModel = model('Service', serviceSchema); 
