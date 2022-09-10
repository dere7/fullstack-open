import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0)
    return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={good / all - bad / all} />
        <StatisticLine text='positive' value={good / all + '%'} />
      </tbody>
    </table>
  )
}

export default Statistics
