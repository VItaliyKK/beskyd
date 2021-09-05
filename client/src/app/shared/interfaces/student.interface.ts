export interface IStudent {
    id?: number;
    group_id: number;
    name: string;
    last_name: string;
    surname: string;
    email: string;
    city: string;
    birthdate: Date;
    logo?: string | null;
    created_at?: Date;
}