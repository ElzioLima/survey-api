import { Question } from "./question"

type SurveyData = { id: string, name: string, description: string, questions: Question[] }

export class Survey {
  id: string
  name: string
  description: string
  questions: Question[]

  constructor (userData: SurveyData) {
    this.id = userData.id
    this.name = userData.name
    this.description = userData.description
    this.questions = userData.questions
  }
}
