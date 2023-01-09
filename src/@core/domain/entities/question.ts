type QuestionData = { id: string, description: string, questionCod: string }

export class Question {
  id: string
  description: string
  questionCod: string

  constructor (userData: QuestionData) {
    this.id = userData.id
    this.description = userData.description
    this.questionCod = userData.questionCod
  }
}
