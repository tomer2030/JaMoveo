import mysql from "mysql"
import appConfig from "./app-config";

// Creating a pool of connection to MySQL:
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});

// Do a execute function to connect the DB
function execute(sql: string, values?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};

