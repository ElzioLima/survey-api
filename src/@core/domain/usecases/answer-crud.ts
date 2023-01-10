export interface CreateAnswerUsecase {
  create: (account: CreateAnswerUsecase.Input) => Promise<CreateAnswerUsecase.Output>
}

export namespace CreateAnswerUsecase {
  export type Input = {
    description: string
    questionId: string
    userId: string
  }

  export type Output = {
    id: string
    description: string
  } | Error
}

export interface UpdateAnswerUsecase {
  update: (account: UpdateAnswerUsecase.Input) => Promise<UpdateAnswerUsecase.Output>
}

export namespace UpdateAnswerUsecase {
  export type Input = {
    id: string
    description: string
    questionId: string
    userId: string
  }

  export type Output = boolean
}

export interface DeleteAnswerUsecase {
  delete: (account: DeleteAnswerUsecase.Input) => Promise<DeleteAnswerUsecase.Output>
}

export namespace DeleteAnswerUsecase {
  export type Input = {
    id: string
  }

  export type Output = boolean
}

export interface ListOneAnswerUsecase {
  listOne: (account: DeleteAnswerUsecase.Input) => Promise<ListOneAnswerUsecase.Output>
}

export namespace ListOneAnswerUsecase {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    id: string
    description: string
  }
}
