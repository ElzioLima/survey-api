export interface DBCreateAnswer {
  create: (input: DBCreateAnswer.Input) => Promise<DBCreateAnswer.Output>
}

export namespace DBCreateAnswer {
  export type Input = {
    description: string
    questionId: string
    userId: string
  }
  export type Output = {
    id: string
    description: string
  }
}

export interface DBUpdateAnswer {
  update: (input: DBUpdateAnswer.Input) => Promise<DBUpdateAnswer.Output>
}

export namespace DBUpdateAnswer {
  export type Input = {
    id: string
    description: string
  }
  export type Output = boolean
}

export interface DBListOneAnswer {
  listOne: (input: DBListOneAnswer.Input) => Promise<DBListOneAnswer.Output>
}

export namespace DBListOneAnswer {
  export type Input = {
    id: string
  }
  export type Output = undefined | {
    id: string
    description: string
  }
}

export interface DBDeleteAnswer {
  delete: (input: DBDeleteAnswer.Input) => Promise<DBDeleteAnswer.Output>
}

export namespace DBDeleteAnswer {
  export type Input = {
    id: string
  }
  export type Output = boolean
}
