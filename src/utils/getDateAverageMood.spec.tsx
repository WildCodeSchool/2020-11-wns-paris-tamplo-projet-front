import getDateAverageMood from './getDateAverageMood'

const studentList = [
  {
    id: '001',
    firstname: 'John',
    lastname: 'doe',
    moods: [
      { note: 3, comment: 'jaime la vie', created_at: '111' },
      { note: 5, comment: 'jaime la vie', created_at: '222' },
      { note: 3, comment: 'jaime la vie', created_at: '444' }
    ]
  },
  {
    id: '002',
    firstname: 'Jane',
    lastname: 'doe',
    moods: [
      { note: 2, comment: 'jaime la vie', created_at: '111' },
      { note: 3, comment: 'jaime la vie', created_at: '222' }
    ]
  },
  {
    id: '003',
    firstname: 'Bob',
    lastname: 'doe',
    moods: [{ note: 5, comment: 'jaime la vie', created_at: '333' }]
  }
]

describe('getUniqueDateFromStudents', () => {
  describe('when list of users is provided', () => {
    it('returns a sorted list of unique dates', () => {
      expect(getDateAverageMood(studentList, '111')).toEqual(2.5)
    })
  })
})
