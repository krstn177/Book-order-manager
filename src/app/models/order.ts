export interface Order{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    count: number;
    isCompleted: boolean;
    createdAt: Date;
}