import getMoodAverage from './average'

const data = [
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

const data2 = [
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
    // describe('student_id case', () => {
    //   it('returns 0', () => {
    //     expect(getMoodAverage([], 2)).toEqual(0)
    //   })
    // })
    describe('date case', () => {
      it('returns 0', () => {
        expect(getMoodAverage([], '17th Nov 2020')).toEqual(0)
      })
    })
  })
  describe('when only one user is provided', () => {
    // it('returns the student note', () => {
    //   expect(getMoodAverage(data2, 2)).toEqual(3)
    // })
    it('returns the student note for that day', () => {
      expect(getMoodAverage(data2, '17th Nov 2020')).toEqual(3)
    })
  })
  describe('when user provided not match valueToFilter', () => {
    describe('as a student_id', () => {
      // it('returns 0', () => {
      //   expect(getMoodAverage(data2, 5)).toEqual(0)
      // })
    })
    describe('as a date', () => {
      it('returns 0', () => {
        expect(getMoodAverage(data2, '19th Nov 2020')).toEqual(0)
      })
    })
  })
  describe('when multiple users are provided', () => {
    // it('returns the student average notes', () => {
    //   expect(getMoodAverage(data, 2)).toEqual(3.5)
    // })
    it('returns the students average note for that day', () => {
      expect(getMoodAverage(data, '16th Nov 2020')).toEqual(4.5)
    })
  })
})
