declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: number;
            DB_TYPE: string;
            DB_NAME: string;
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string;
            DB_PASS: string;
            DB_DIALECT: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
            IMAGES_PATH: string;
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}