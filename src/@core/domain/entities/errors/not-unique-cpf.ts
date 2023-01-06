export class NotUniqueCPF extends Error {
  constructor () {
    super('CPF already exists')
    this.name = 'Not Unique CPF'
  }
}
