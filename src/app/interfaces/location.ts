export interface Location {
    id?: number;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    categoryDetails?: {
        name: string;
    };
}