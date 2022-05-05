import express from 'express'
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "438e003e9c46da",
      pass: "944a8c38de30d1"
    }
  });

app.post('/feedbacks', async (req, res) => {
    
    const feedback = await prisma.feedback.create({
        data: {
            type: req.body.type,
            comment: req.body.comment,
            screenshot: req.body.screenshot,
        }
    });

   await transport.sendMail({
        from: 'Equipe feedget <geral@feedget.com>',
        to: 'Felipe Tavares <felipeat07@gmail.com>',
        subject: 'Novo Feedback',
        html: [
            `<p>Tipo do feedback: ${req.body.type} </p>`,
            `<p>Comentário: ${req.body.comment} <p/>`,
        ].join('')
    });

    return res.status(201).json(feedback);
});

app.listen(3333, () => {
    console.log('Servidor ON');
});