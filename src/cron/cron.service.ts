import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { EmailService } from 'src/email/email.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { User } from 'src/users/entities/user.entity';
import { Tipo } from 'src/subscription/entities/subscription.entity';
import { join } from 'path';
import { readFileSync } from 'fs';
 
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
 
  constructor(
    private readonly emailService: EmailService,
    private readonly subscriptionService: SubscriptionService,
  ) {}
 
  private async getFreeUsers(): Promise<User[]> {
    // Asumiendo que tienes un método para obtener todos los usuarios con suscripción gratuita
    return this.subscriptionService.getUsersBySubscriptionType(Tipo.Free);
  }
 
  private async sendPeriodicEmail(user: User) {
    try {
      // Leer el archivo HTML desde el sistema de archivos
      const htmlTemplatePath = join(__dirname, '../../src/cron/templates/upgradeReminder.html');
      let htmlContent = readFileSync(htmlTemplatePath, 'utf8');
 
      // Reemplazar el placeholder {{firstName}} con el nombre real del usuario
      htmlContent = htmlContent.replace('{{firstName}}', user.firstName);
 
      // Enviar el correo utilizando el servicio de email
      await this.emailService.sendEmail(
        user.email,
        'Recordatorio de NexoTV',
        'No te pierdas nuestras novedades',
        htmlContent,
      );
 
      this.logger.log(`Email enviado a ${user.email}`);
    } catch (error: any) {
      this.logger.error(`Error enviando email a ${user.email}: ${error.message}`);
    }
  }
 
  public startCronJob() {
    cron.schedule('0 9 * * SUN', async () => { // Ejecutar cada domingo a las 9 de la mañana
      this.logger.log('Iniciando trabajo cron...');
      const users = await this.getFreeUsers();
      for (const user of users) {
        await this.sendPeriodicEmail(user);
      }
      this.logger.log('Trabajo cron completado.');
    });
  }
}