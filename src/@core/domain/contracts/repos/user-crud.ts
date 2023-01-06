export interface DBCreateUser {
  create: (input: DBCreateUser.Input) => Promise<DBCreateUser.Output>
}

export namespace DBCreateUser {
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
  }
}

export interface DBUpdateUser {
  update: (input: DBUpdateUser.Input) => Promise<DBUpdateUser.Output>
}

export namespace DBUpdateUser {
  export type Input = {
    id: string
    name: string
    password: string
  }
  export type Output = boolean
}

export interface DBListUser {
  list: () => Promise<DBListUser.Output>
}

export namespace DBListUser {
  export type Output = undefined | Array<{
    id: string
    name: string
    password: string
    cpf: string
  }>
}

export interface DBListOneUser {
  listOne: (input: DBListOneUser.Input) => Promise<DBListOneUser.Output>
}

export namespace DBListOneUser {
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

export interface DBDeleteUser {
  delete: (input: DBDeleteUser.Input) => Promise<DBDeleteUser.Output>
}

export namespace DBDeleteUser {
  export type Input = {
    id: string
  }
  export type Output = boolean
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (input: UpdateAccessTokenRepository.Input) => Promise<UpdateAccessTokenRepository.Output>
}

export namespace UpdateAccessTokenRepository {
  export type Input = {
    id: string
    token: string
  }

  export type Output = void
}

export interface LoadByUniqueCPFRepository {
  loadByCPF: (input: LoadByUniqueCPFRepository.Input) => Promise<LoadByUniqueCPFRepository.Output>
}

export namespace LoadByUniqueCPFRepository {
  export type Input = {
    cpf: string
  }

  export type Output = boolean
}
