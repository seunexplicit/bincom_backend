declare global {
     namespace NodeJS {
          interface ProcessEnv {
               NODE_ENV: 'development' | 'production';
          }
     }

     namespace Express {
          interface Request {
               credentialEmail: string,
               credentialPassword: string,
               credentialId:string,
          }
     }
}

declare module 'mysql-import' {
     interface Importer{
          new(options: Settings): Impor,

          new(): Impor
     }

     interface Impor {

          getImported(): Promise<any>,

          setEncoding(encoding: BufferEncoding): any,

          import(filePath: string | string[]): Promise<any>
     }

     interface Settings {
          
          host: string;
          
          port?: number | undefined;
          
          user: string;
          
          password: string;
          
          database: string;
          
          onerror?(error: any): void;
     }
}

/*export const environment = {
     production: false
}*/
export {}