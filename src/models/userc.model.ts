export class UserC{
    userId:String;
    username:String;
    connected: Boolean

    constructor(userId: String,username: String){
        this.userId = userId;
        this.username = username;
        this.connected = true
    }
}