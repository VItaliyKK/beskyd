export interface IDepartment {
    id?: number;
    name: string;
    abbr: string;
    founded: Date;
    logo?: string | null;
    created_at?: Date;
}