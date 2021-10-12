import { readFile } from 'fs';
import util from 'util';

export const readAFile = async (dir: string, enconding?: BufferEncoding) => {
     try {
          const fileReader = util.promisify(readFile);
          return await fileReader(dir, { encoding: enconding||'utf8' });
     }
     catch (err) {
          throw new Error('file connot be read')
     }
}