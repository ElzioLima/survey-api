type AnswerData = { id: string, description: string }

export class Answer {
  id: string
  description: string

  constructor (userData: AnswerData) {
    this.id = userData.id
    this.description = userData.description
  }
}
