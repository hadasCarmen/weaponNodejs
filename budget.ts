import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async getFileData(filename: string): Promise<string> {
    try {
      const filePath = path.join(process.cwd(), 'assets', filename);
      const data = await fs.readFile('./budget.txt', { encoding: 'utf8' });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to read file');
    }
  }
}
