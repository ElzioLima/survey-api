export interface DBCreateSurvey {
  create: (input: DBCreateSurvey.Input) => Promise<DBCreateSurvey.Output>
}

export namespace DBCreateSurvey {
  export type Input = {
    name: string
    description: string
    questions: {
      description: string,
      questionCod: string
    }[]
    userId: string
  }
  export type Output = {
    id: string
    name: string
    description: string
    questions: {
      id: string,
      description: string,
      questionCod: string
    }[]
  }
}

export interface DBUpdateSurvey {
  update: (input: DBUpdateSurvey.Input) => Promise<DBUpdateSurvey.Output>
}

export namespace DBUpdateSurvey {
  export type Input = {
    id: string
    name: string
    description: string
    newQuestions: {
      description: string,
      questionCod: string
    }[]
    oldQuestions: string[]
  }
  export type Output = boolean
}

export interface DBListSurvey {
  list: (input: DBListSurvey.Input) => Promise<DBListSurvey.Output>
}

export namespace DBListSurvey {
  export type Input = {
    page: number
  }

  export type Output = undefined | Array<{
    id: string
    name: string
    description: string
    questions: {
      id: string,
      description: string,
      questionCod: string
    }[]
  }>
}

export interface DBListOneSurvey {
  listOne: (input: DBListOneSurvey.Input) => Promise<DBListOneSurvey.Output>
}

export namespace DBListOneSurvey {
  export type Input = {
    id: string
  }
  export type Output = undefined | {
    id: string
    name: string
    description: string
    questions: {
      id: string,
      description: string,
      questionCod: string
    }[]
  }
}

export interface DBDeleteSurvey {
  delete: (input: DBDeleteSurvey.Input) => Promise<DBDeleteSurvey.Output>
}

export namespace DBDeleteSurvey {
  export type Input = {
    id: string
  }
  export type Output = boolean
}
