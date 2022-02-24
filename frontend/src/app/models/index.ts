export default class User {
    _id: string;
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

export interface Office {
  _id: string;
  name: string;
  location: string;
}

export interface Employee {
  tags: any[];
  _id: string;
  firstName: string;
  lastName: string;
  office: Office;
  phoneNumber: string;
  birthDate: Date;
}
