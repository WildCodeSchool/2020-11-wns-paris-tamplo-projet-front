export interface IQuiz {
  id: string
  title: string
  comment: string
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  responses: IResponse[]
}

export interface IResponse {
  response: string
  isCorrect: boolean
}
