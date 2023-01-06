type UserData = { id: string, name: string, password: string, cpf: string, accessToken?: string }

export class User {
  id: string
  name: string
  password: string
  cpf: string
  accessToken?: string

  constructor (userData: UserData) {
    this.id = userData.id
    this.name = userData.name
    this.password = userData.password
    this.cpf = userData.cpf
    this.accessToken = userData.accessToken
  }
}
