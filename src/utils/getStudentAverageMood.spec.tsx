import getStudentAverageMood from './getStudentAverageMood'

const studentOne = {
  id: '001',
  firstname: 'John',
  lastname: 'doe',
  moods: [
    { note: 3, comment: 'jaime la vie', created_at: '111' },
    { note: 5, comment: 'jaime la vie', created_at: '222' },
    { note: 2, comment: 'jaime la vie', created_at: '444' }
  ]
}
const studentTwo = {
  id: '002',
  firstname: 'Jane',
  lastname: 'doe',
  moods: [{ note: 2, comment: 'jaime la vie', created_at: '111' }]
}

describe('getStudentAverageMood', () => {
  describe('when student has multiple mood', () => {
    it('returns an average value', () => {
      expect(getStudentAverageMood(studentOne)).toEqual(3.3)
    })
  })
})
