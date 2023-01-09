export interface DBCreateQuestion {
  create: (input: DBCreateQuestion.Input) => Promise<DBCreateQuestion.Output>
}

export namespace DBCreateQuestion {
  export type Input = {
    description: string
    questionCod: string
    surveyId: string
  }
  export type Output = {
    id: string
    description: string
    questionCod: string
  }
}

export interface DBUpdateQuestion {
  update: (input: DBUpdateQuestion.Input) => Promise<DBUpdateQuestion.Output>
}

export namespace DBUpdateQuestion {
  export type Input = {
    id: string
    description: string
    questionCod: string
  }
  export type Output = boolean
}

export interface DBListQuestion {
  list: (input: DBListQuestion.Input) => Promise<DBListQuestion.Output>
}

export namespace DBListQuestion {
  export type Input = {
    page: number
  }

  export type Output = undefined | Array<{
    id: string
    description: string
    questionCod: string
  }>
}

export interface DBListOneQuestion {
  listOne: (input: DBListOneQuestion.Input) => Promise<DBListOneQuestion.Output>
}

export namespace DBListOneQuestion {
  export type Input = {
    id: string
  }
  export type Output = undefined | {
    id: string
    description: string
    questionCod: string
  }
}

export interface DBDeleteQuestion {
  delete: (input: DBDeleteQuestion.Input) => Promise<DBDeleteQuestion.Output>
}

export namespace DBDeleteQuestion {
  export type Input = {
    id: string
  }
  export type Output = boolean
}
