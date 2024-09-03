import { IncidentModel } from "../../data/models/incident.model";
import { IIncidentDocument } from "../entities/incident.entity";

export class IncidentDataSource {

    public updateIncident = async (id: String, incident: Partial<IIncidentDocument>) => {
        await IncidentModel.findByIdAndUpdate(id, {
            title: incident.title,
            description: incident.description,
            lat: incident.lat,
            lng: incident.lng,
            isEmailSent: incident.isEmailSent
        });
    }
}