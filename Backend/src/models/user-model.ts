import Joi from "joi";

class UserModel {

    public userId: number;
    public username: string;
    public password: string;
    public instrumentId: number;
    public roleId: number;

    public constructor(user:UserModel){
        this.userId = user.userId;
        this.username = user.username;
        this.password = user.password;
        this.instrumentId = user.instrumentId;
        this.roleId = user.roleId;
    }

    // Make a validation schema for use later to validate the data
    public static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(50),
        instrumentId: Joi.number().required().positive(),
        roleId: Joi.number().optional()
    });

    // Function for validate the data
    public validate():string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;