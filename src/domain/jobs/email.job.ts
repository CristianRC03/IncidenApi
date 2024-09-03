import cron from 'node-cron'
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../service/email.service';
import { IncidentDataSource } from '../datasource/incident.datasource';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();
    const incidentDatasource = new IncidentDataSource();

    cron.schedule('*/10 * * * * *', async () => {
        try {
            const incidents = await IncidentModel.find({ isEmailSent: false });
            if (!incidents.length) {
                console.log('No hay incidentes pendientes de enviar')
                return;
            }

            console.log(`procesando ${incidents.length} incidentes`)

            await Promise.all(
                incidents.map(async (incident) => {
                    const htmlBody = generateIncidentEmailTemplate(
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.lng
                    );

                    await emailService.sendEmail({
                        to: 'crizcamach2003@gmail.com',
                        subject: `Incidente: ${incident.title}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el incidente con ID: ${incident.id}`);
                    
                    await incidentDatasource.updateIncident(incident._id.toString(), { ...incident, isEmailSent: true });
                    console.log(`Incidente actualizado para el ID: ${incident.id}`);
                })
            );
            
        } catch (error) {
            console.error('Error Durante el trabajo de envioo del correos')
        }
    })
}