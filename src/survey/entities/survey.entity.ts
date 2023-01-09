export class Survey {
    id: string;
    name: string;
    description: string;
    questions: {
        id: string;
        description: string;
        questionCod: string;
    }[]
}
