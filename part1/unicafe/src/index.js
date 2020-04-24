import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const FeedbackForm = ({ handlers }) => {
  const feedbackHeaderText = "give feedback"

  return (
    <div>
      <Header text={feedbackHeaderText} />
      <Button text="good" handleClick={handlers.good} />
      <Button text="neutral" handleClick={handlers.neutral}/>
      <Button text="bad" handleClick={handlers.bad}/>
    </div>
  )
}

const Statistic = ({ text, value, postText }) => (
  <tr> 
    <td> {text} </td> 
    <td> {value} </td>
  </tr>
)

const Statistics = ({ numGood, numNeutral, numBad }) => {
  const total = numGood + numNeutral + numBad

  const avg = (numGood - numBad) / total
  const positive = numGood / total * 100

  if (total === 0) {
    return (
      <div>
        <Header text="statistics" />
        <p> No feedback given </p>
      </div>
    )
  } else {
    return (
      <div>
        <Header text="statistics" />
        <table><tbody>
          <Statistic text="good"     value={numGood} />
          <Statistic text="neutral"  value={numNeutral} />
          <Statistic text="bad"      value={numBad} />
          <Statistic text="all"      value={total} />
          <Statistic text="average"  value={avg.toFixed(1)} />
          <Statistic text="positive" value={positive.toFixed(1) + " %"} />
        </tbody></table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const submitFeedback = (counter, setCounter) => {
    return () => setCounter(counter + 1)  
  }

  const handlers = {
    good: submitFeedback(good, setGood),
    neutral: submitFeedback(neutral, setNeutral),
    bad: submitFeedback(bad, setBad)
  }

  return (
    <>
      <FeedbackForm handlers={handlers} />
      <Statistics numGood={good} numNeutral={neutral} numBad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)