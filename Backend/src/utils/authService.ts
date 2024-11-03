import jwt from "jsonwebtoken";
import { Request } from "express";
import crypto from "crypto";
import UserModel from "../models/user-model";
import RoleModel from "../models/role-model";
import { UnauthorizedErrorModel } from "../models/errors-model";

class AuthService {
    
    private secretKey = "ToViWebsite"

    // Generate new token
    public getNewToken(user: UserModel): string {
    
        // Delete the password before create the token
        delete user.password;
        
        const container = { user };
        
        const options = { expiresIn: "10h" };
        
        // Create the token and return it
        const token = jwt.sign(container, this.secretKey, options);
        return token;
    
    }
    
    // Verify if the token is valid 
    public verifyToken(request: Request): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            try {
                
                // Get the token from the header
                const header = request.header("authorization");
                if(!header) {
                    resolve(false);
                    return;
                }
                const token = header.substring(7);
    
                // If there is no token
                if(!token){
                    resolve(false);
                    return;
                }
    
                // Verify the token is valid
                jwt.verify(token, this.secretKey, err => {
                    if(err) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
    
            } catch (error: any) {
                reject(error);
            }
    
        });
    }
    
    // Function for rescue the user details from the token
    public async rescueUserFromToken(request: Request): Promise<UserModel>{
    
        // First, verify the token
        const isValid = this.verifyToken(request);
        if(!isValid) throw new UnauthorizedErrorModel("invalid token");
    
        // Get the token
        const header = request.header("authorization");
        const token = header.substring(7);
    
        // Extract container from token:
        const container: any = jwt.decode(token);
            
        // Extract user: 
        const user: UserModel = container.user;
        
        // Return the user details
        return user;
    
    }
    
    // Verify if the user is admin
    public async verifyAdmin(request: Request): Promise<boolean> {
        
        // Check if logged in
        const isLoggedIn = await this.verifyToken(request);    
        if(!isLoggedIn) return false;
    
        // Get the user from token
        const user: UserModel = await this.rescueUserFromToken(request);
        
        // Return true if user is admin and false if user is customer
        return user.roleId === RoleModel.Admin;
    }
    
    // Function for hashing and salt, for the password before save it in DB
    public hash(plainText: string): string {
        
        // The salt
        const salt = "theBestWebsiteEver";
    
        // Hash with the salt
        const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
        return hashedText
    }
}

const authService = new AuthService();
export default authService;