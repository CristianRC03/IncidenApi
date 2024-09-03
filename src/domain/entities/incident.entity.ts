export interface IIncident {
    title: string;
    description: string;
    lat: number;
    lng: number;
    isEmailSent: boolean;
}

export interface IIncidentDocument extends IIncident, Document {}