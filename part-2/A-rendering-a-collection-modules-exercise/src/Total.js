const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
}
export default Total