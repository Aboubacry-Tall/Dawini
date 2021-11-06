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
    password1 ?: string;
    password2 ?: string;
}
