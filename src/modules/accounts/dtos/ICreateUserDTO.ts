interface ICreateUserDTO {
    id?: string;
    email: string;
    password: string;
    name: string;
    photo?: string;
    phone: string;
    isAdmin?: boolean;
}

export { ICreateUserDTO };
