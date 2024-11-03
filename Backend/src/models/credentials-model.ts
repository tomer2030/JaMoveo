import Joi from "joi";

class CredentialsModel {

    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel){
        this.username = credentials.username;
        this.password = credentials.password;
    }

    // Make a validation schema for use later to validate the data
    public static validationSchema = Joi.object({
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(200)
    });

    // Function for validate the data
    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel;