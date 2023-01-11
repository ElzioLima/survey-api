export interface CreateSurveyUsecase {
  create: (account: CreateSurveyUsecase.Input) => Promise<CreateSurveyUsecase.Output>
}

export namespace CreateSurveyUsecase {
  export type Input = {
    name: string
    description: string
    questions: {
      description: string,
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
    }[]
  } | Error
}

export interface UpdateSurveyUsecase {
  update: (account: UpdateSurveyUsecase.Input) => Promise<UpdateSurveyUsecase.Output>
}

export namespace UpdateSurveyUsecase {
  export type Input = {
    id: string
    name: string
    description: string
    newQuestions: {
      description: string
    }[]
    oldQuestions: string[]
  }

  export type Output = boolean
}

export interface DeleteSurveyUsecase {
  delete: (account: DeleteSurveyUsecase.Input) => Promise<DeleteSurveyUsecase.Output>
}

export namespace DeleteSurveyUsecase {
  export type Input = {
    id: string
  }

  export type Output = boolean
}

export interface ListSurveyUsecase {
  list: (input: ListSurveyUsecase.Input) => Promise<ListSurveyUsecase.Output>
}

export namespace ListSurveyUsecase {
  export type Input = {
    page: number
  }

  export type Output = {
    name: string
    description: string
    questions: {
      id: string,
      description: string,
    }[]
  }[]
}

export interface ListOneSurveyUsecase {
  listOne: (account: DeleteSurveyUsecase.Input) => Promise<ListOneSurveyUsecase.Output>
}

export namespace ListOneSurveyUsecase {
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
    }[]
  }
}
