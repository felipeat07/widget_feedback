import { MailAdapter } from "../../adapters/mail-adapter";
import { FeedbacksRepository } from "../feedback-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmiteFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}
    
    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;


        if(!type){
            throw new Error('Type is require');
        }

        if(!comment){
            throw new Error('Comment is require');
        }




        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [ `<p>tipo do feedback: ${type}</p>`, 
                    `<p>comentário: ${comment}</p>`,
                    screenshot ? `<img src= "${screenshot}"/>` : '',
        ].join('')
        })

    } 
}