import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import path from 'path';

const imageData = [];

export const getImageData = () => [...imageData];

export const initImageData = async () => {
  return new Promise<void>((resolve, reject) => {
    createReadStream(path.resolve(__dirname, './asset-data.csv')).pipe(
      parse({ delimiter: ',', cast: true, columns: true })
        .on('data', (row) => {
          imageData.push(row);
        })
        .on('end', () => resolve())
        .on('error', (err) => {
          console.error(err);
          reject();
        }),
    );
  });
};
