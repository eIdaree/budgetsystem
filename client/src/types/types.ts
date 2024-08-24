export interface IUser{
    email:string;
    password:string;
    token:string;
}

export interface IUserData{
    email:string;
    password:string;
}

export interface IResponseUser{
    id:string | undefined;
    email:string | undefined;
    password:string | undefined;
    createdAt:string | undefined;
    updatedAt:string | undefined;
}

export interface IResponseUserData{
    token:string;
    user: IResponseUser;
}

export interface ICategory{
    title:string
    id:number
    createdAt:string
    updatedAt:string
    transactions?: []
}

export interface IResponseTransactionLoader{
    categories: ICategory[];
    transactions: ITransaction[];
}

export interface ITransaction {
    sum:number,
    title:string;
    type: string;
    dateTime: string;
    updatedAt: string;
    id:number;
    comment:string;
    category: ICategory
}