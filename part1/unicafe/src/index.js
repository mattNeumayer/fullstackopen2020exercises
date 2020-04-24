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

const Statistics = ({ numGood, numNeutral, numBad }) => {
  return (
    <div>
      <Header text="statistics" />
      <p> good {numGood} </p>
      <p> neutral {numNeutral} </p>
      <p> bad {numBad} </p>
    </div>
  )
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