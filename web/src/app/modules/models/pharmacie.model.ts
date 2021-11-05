export class Pharmacie {
    id ?: number;
    nom ?: string;
    pseudo ?: string;
    email ?: string;
    password ?: string;
    primaire !: number;
    secondaire ?: string;
    whatsapp ?: string;
    longitude ?: string;
    latitude ?: string;
    distance : string = '';
}
