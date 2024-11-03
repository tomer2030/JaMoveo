import { OkPacket } from "mysql";
import { ValidationErrorModel } from "../models/errors-model";
import RoleModel from "../models/role-model";
import UserModel from "../models/user-model";
import authService from "../utils/authService";
import dal from "../utils/dal";
import sqlQueries from "../utils/sql-queries";
import CredentialsModel from "../models/credentials-model";

// Function for add new user to database
async function addNewUser(user: UserModel): Promise<string>{

    // Validation: if the data is valid and if the user doesn't exist
    const error = user.validate();
    if(error) throw new ValidationErrorModel(error);

    const ifUserExist = await dal.execute(sqlQueries.checkIfUserExist, user.username);
    if(ifUserExist.length !== 0) throw new ValidationErrorModel("Username already exist");

    // Hash the password before send it to DB
    user.password = authService.hash(user.password);

    // Define the new user as player if he not have role
    if(!user.roleId) user.roleId = RoleModel.Player;

    // Make an array for all the values that will sent to the DB
    const values = [user.username, user.password, user.instrumentId, user.roleId];

    // Add the user to the DB
    const info: OkPacket = await dal.execute(sqlQueries.addNewUser, values);
    user.userId = info.insertId;

    // Get token
    const token = authService.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validation: if the data is valid and if the user exist
    const error = credentials.validate();
    if(error) throw new ValidationErrorModel(error);

    // Hash the password before check if the credentials are ok
    credentials.password = authService.hash(credentials.password);

    const values = [credentials.username, credentials.password];
    const userInContainer = await dal.execute(sqlQueries.logIn, values);
    const user: UserModel = userInContainer[0];

    // Throw error if the user doesn't exist
    if(!user) throw new ValidationErrorModel("Incorrect username or password");

    // Generate token
    const token = authService.getNewToken(user);
    return token;
}

export default {
    addNewUser, login
}