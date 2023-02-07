function timePretty (str) {
  const dataArray = str.split(' ')
  const date = dataArray[0].slice(5)
  const time = dataArray[1].slice(0, 5)
  return `${date} ${time}`
}

module.exports.timePretty = timePretty
