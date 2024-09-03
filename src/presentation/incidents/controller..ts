import { Request, Response } from 'express';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../../domain/service/email.service';

export class IncidentController {

    public getIncidents = async (req: Request, res: Response) => {
        try {
            const incidents = await IncidentModel.find();
            return res.json(incidents);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public createIncident = async (req: Request, res: Response) => {
        const { title, description, lat, lng } = req.body;
        const newIncident = await IncidentModel.create({
            title,
            description,
            lat,
            lng
        });

        /*const emailService = new EmailService();
            await emailService.sendEmail({
                to: 'crizcamach2003@gmail.com',
                subject: title,
                htmlBody: `<h1>${description}</h1>`        
            })*/
        
        return res.json(newIncident)
    }

    public getIncidentById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const incident = await IncidentModel.findById(id);
            return res.json(incident);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public updateIncident = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, lat, lng } = req.body;
        try {
            const incident = await IncidentModel.findByIdAndUpdate(id, {
                title,
                description,
                lat,
                lng
            });
            return res.json(incident);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public deleteIncident = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const incident = await IncidentModel.findByIdAndDelete(id);
            return res.json({message: 'Registro borrado'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}