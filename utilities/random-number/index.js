const randomNumber = ({
  max
}) => {
  const base = Math.random()

  return Math.floor(base * max)
}

export default randomNumber
