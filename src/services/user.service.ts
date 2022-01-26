import { IUser } from "./../models/user.model";
import { User } from "../models/user.model";
import log from "../logging/logger";

//create user
export async function createUser(user: IUser) {
  return User.create(user).catch((error: any) => {
    log.error("Error creating user");
  });
}

export async function createUserFromGoogle(
  username: string,
  googleId: string,
  email: String,
  imageUrl : String
) {
  //encontramos si existe un usuario con el mismo googleid

  const found = (await User.findOne({ googleId: googleId }).lean().catch(
    (error: any) => {
      log.error("Error finding user");
    }
  )) as IUser;
  if (!found)
    return User.create({
      username: username,
      email: email,
      password: "ajlsfhljñsdfhjlsdafhf8ohwerrkljhp78921089u31209sdjlkshfo",
      googleId: googleId,
      imageUrl: imageUrl
    }).catch((error) => {
      log.error("Error creating user from google");
    });
  return found;
}


//delete user
export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id).catch((error: any) => {
    log.error("Error deleting user");
  });
}

//get user
export async function findUserById(id: string): Promise<IUser> {
  const user = await User.findById(id).catch((error: any) => {
    log.error("Error finding user");
  });

  return user as IUser;
}

//get all users
export async function getUsers() {
  return User.find().catch((error: any) => {
    log.error("Error finding users");
  });
}

//get userbyemail
export async function findUserByEmail(email: string) {
  return User.findOne({ email: email })
    .lean()
    .catch((error: any) => {
      log.error(`Error finding user with email : ${email}`, error);
    });
}

//modify user
export async function updateUser(id: string, user: IUser) {
  return User.findByIdAndUpdate(id, user, { new: true }).lean().catch((error: any) => {
    log.error("Error updating user");
  });
}



//validate password
export async function validatePassword(email: string, password: string) {
  const user = await User.findOne({ email: email });
  if (!user) return false;
  const valid = await user.comparePasswords(password);
  if (valid) return true;
  return false;
}

