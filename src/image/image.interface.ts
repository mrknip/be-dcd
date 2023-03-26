export interface ImageMetadata {
  id: number;
  uri: string;
  species: string;
  description: string;
}

export enum SPECIES {
  DOG = 'dog',
  CAT = 'cat',
  DUCK = 'duck',
}
