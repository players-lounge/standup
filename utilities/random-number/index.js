const randomNumber = ({ max, excluding }) => {
  if (max === 0) return 0

  const base = Math.random()
  const randomWholeNumber = Math.floor(base * max)
  console.log('max ', max)
  console.log('excluding ', excluding)
  console.log('random ', randomWholeNumber)
  console.log('')
  return (randomWholeNumber === excluding && max !== 1) ? randomNumber({ max, excluding }) : randomWholeNumber
}

export default randomNumber
