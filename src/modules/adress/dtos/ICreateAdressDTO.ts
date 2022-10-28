interface ICreateAdressDTO {
    id?: string;
    cep: string;
    public_place: string;
    number: number;
    city: string;
    state: string;
    country: string;
    complement: string;
    reference: string;
}

export { ICreateAdressDTO };
