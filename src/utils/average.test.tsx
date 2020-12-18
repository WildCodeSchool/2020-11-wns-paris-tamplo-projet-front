import getMoodAverage from './average'

const students = [
  {
    id: 1,
    firstname: 'Jane',
    lastname: 'Doe',
    note: 3,
    date: '17th Nov 2020',
    student_id: 2
  },
  {
    id: 2,
    firstname: 'John',
    lastname: 'Doe',
    note: 2,
    date: '17th Nov 2020',
    student_id: 1
  },
  {
    id: 3,
    firstname: 'Jane',
    lastname: 'Doe',
    note: 4,
    date: '16th Nov 2020',
    student_id: 2
  },
  {
    id: 4,
    firstname: 'John',
    lastname: 'Doe',
    note: 5,
    date: '16th Nov 2020',
    student_id: 1
  },
  {
    id: 5,
    firstname: 'Audrey',
    lastname: 'Ritzenthaler',
    note: 5,
    date: '17th Nov 2020',
    student_id: 3
  }
]

const student = [
  {
    id: 1,
    firstname: 'Jane',
    lastname: 'Doe',
    note: 3,
    date: '17th Nov 2020',
    student_id: 2
  }
]

describe('getMoodAverage', () => {
  describe('when no user is provided', () => {
    it('returns 0', () => {
      expect(getMoodAverage([], '17th Nov 2020')).toEqual(0)
    })
  })
  describe('when only one user is provided', () => {
    it('returns the student note for that day', () => {
      expect(getMoodAverage(student, '17th Nov 2020')).toEqual(3)
    })
  })
  describe('when user provided not match date', () => {
    it('returns 0', () => {
      expect(getMoodAverage(student, '19th Nov 2020')).toEqual(0)
    })
  })
  describe('when multiple users are provided', () => {
    it('returns the students average note for that day', () => {
      expect(getMoodAverage(students, '16th Nov 2020')).toEqual(4.5)
    })
  })
})
