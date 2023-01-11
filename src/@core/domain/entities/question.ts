type QuestionData = { id: string, description: string }

export class Question {
  id: string
  description: string

  constructor (userData: QuestionData) {
    this.id = userData.id
    this.description = userData.description
  }
}
