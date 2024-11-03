class SqlQueries {
    public getInstruments = `
        SELECT * FROM instruments;
    `;
    public addNewUser = `
        INSERT INTO users
        VALUES(
            DEFAULT, ?, ?, ?, ?
        );
    `;
    public logIn = `
        SELECT * FROM users
        WHERE username = ? AND password = ?;
    `;
    public checkIfUserExist = `
        SELECT * FROM users
        WHERE username = ?;
    `;
}
const sqlQueries = new SqlQueries();
export default sqlQueries;