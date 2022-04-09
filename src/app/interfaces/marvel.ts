export interface MarvelData {
  _id: string;
  title: string;
  body: string;
  image: string;
  category: string;
  idAuthor: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface MarvelFormData {
  status: 'save' | 'cancel',
  data?: any,
}
