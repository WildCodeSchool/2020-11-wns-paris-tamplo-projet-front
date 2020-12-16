const getAverageOfList = (arr) =>
  arr.reduce((total, value) => total + value, 0) / arr.length

const getFilteredList = (arr, id, keyId, keyValue) => {
  return arr.reduce(
    (total, { [keyId]: idValue, [keyValue]: value }) =>
      idValue === id ? [...total, value] : total,
    []
  )
}

const averageValueOfArray = (arr, id, keyId, keyValue) => {
  const list = getFilteredList(arr, id, keyId, keyValue)
  if (!list.length) return 0
  return getAverageOfList(list).toFixed(1)
}

export default averageValueOfArray
