import { SubmiteFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {
    it('should be able to submit a feedback', () => {
        const submitFeedback = new SubmiteFeedbackUseCase(
            { create: async () => {}},
            { sendMail: async () => {}}
        )

        expect(submitFeedback.execute({
            type: 'IDEA',
            comment: 'Exemplo',
            screenshot: 'teste.jpg'
        })).resolves.not.toThrow();

    })

        it('should not to be able to submit without type', () => {
            const submitFeedback = new SubmiteFeedbackUseCase(
                { create: async () => {}},
                { sendMail: async () => {}}
            )
    
            expect(submitFeedback.execute({
                type: '',
                comment: 'Exemplo',
                screenshot: 'teste.jpg'
            })).rejects.toThrow();

        })

        it('should not to be able to submit without comment', () => {
                const submitFeedback = new SubmiteFeedbackUseCase(
                    { create: async () => {}},
                    { sendMail: async () => {}}
                )
        
                expect(submitFeedback.execute({
                    type: 'IDEA',
                    comment: '',
                    screenshot: 'teste.jpg'
                })).rejects.toThrow();

          })   

    });

