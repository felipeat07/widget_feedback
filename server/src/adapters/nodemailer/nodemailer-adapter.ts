import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "438e003e9c46da",
      pass: "944a8c38de30d1"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){

        await transport.sendMail({
            from: 'Equipe feedget <geral@feedget.com>',
            to: 'Felipe Tavares <felipeat07@gmail.com>',
            subject: subject,
            html: body
        });

    };
}