const mockData = [
  {
    username: 'medet'
  },
  {
    username: 'aybis'
  },
]

const getEmployees = (_, res) => {
  res.status(200).json(mockData)
}


module.exports = {
  getEmployees
}