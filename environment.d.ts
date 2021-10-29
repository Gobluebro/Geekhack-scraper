declare global {
    namespace NodeJS {
        interface ProcessEnv {
        PORT: number;
        SERVER_PORT: number;
        DB_TYPE: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_DIALECT: Dialect | undefined;
        IMAGES_PATH: string;
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}