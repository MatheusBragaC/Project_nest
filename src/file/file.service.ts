import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(file, path: string) {
    return writeFile(path, file.buffer);
  }
}
