export interface IMood {
  note: number
  comment: string
  created_at: string
}

export interface IStudent {
  id: string
  firstname: string
  lastname: string
  moods: IMood[]
}

export interface IUser {
  firstname: string
  lastname: string
  isStudent: boolean
  avatar: string
}
