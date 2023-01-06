export interface CreateUserUsecase {
  create: (account: CreateUserUsecase.Input) => Promise<CreateUserUsecase.Output>
}

export namespace CreateUserUsecase {
  export type Input = {
    name: string
    password: string
    cpf: string
  }

  export type Output = {
    id: string
    name: string
    password: string
    cpf: string
  } | Error
}

export interface UpdateUserUsecase {
  update: (account: UpdateUserUsecase.Input) => Promise<UpdateUserUsecase.Output>
}

export namespace UpdateUserUsecase {
  export type Input = {
    id: string
    name: string
    password: string
  }

  export type Output = boolean
}

export interface DeleteUserUsecase {
  delete: (account: DeleteUserUsecase.Input) => Promise<DeleteUserUsecase.Output>
}

export namespace DeleteUserUsecase {
  export type Input = {
    id: string
  }

  export type Output = boolean
}

export interface ListUserUsecase {
  list: () => Promise<ListUserUsecase.Output>
}

export namespace ListUserUsecase {
  export type Output = {
    name: string
    password: string
    cpf: string
  }[]
}

export interface ListOneUserUsecase {
  listOne: (account: DeleteUserUsecase.Input) => Promise<ListOneUserUsecase.Output>
}

export namespace ListOneUserUsecase {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    id: string
    name: string
    password: string
    cpf: string
  }
}
