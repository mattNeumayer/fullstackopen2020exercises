import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const AnecdoteDisplay = ({ text, numVotes}) => (
  <p>
    {text} <br /> 
    has {numVotes} votes
  </p>
)

const AnecdoteOfTheDay = (props) => {
  const setRandomAnecdode = () => {
    const rand = getRandomInt(props.anecdotes.length)
    props.setSelected(rand)
  }

  const addVoteToSelected = () => props.addVote(props.selected)

  return (
    <div>
      <h2> Anecdote of the day </h2>
      <AnecdoteDisplay text={props.anecdotes[props.selected]} 
                       numVotes={props.votes[props.selected]} />
      <Button text="vote" handleClick={addVoteToSelected} />
      <Button text="next anecdote" handleClick={setRandomAnecdode} />
    </div>
  )
}

const TopAnecdote = (props) => {
  let maxIndex = props.maxVotesIndex
  let maxVotes = props.votes[maxIndex]
  return (
    <div>
      <h2> Anecdote with most votes </h2>
      <AnecdoteDisplay text={props.anecdotes[maxIndex]} numVotes={maxVotes} />
    </div>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const addVote = (index) => {
    const updatedVotes = [...votes]
    updatedVotes[index] += 1
    setVotes(updatedVotes)

    // Make sure to always keep the maxVotes state fresh!
    if (updatedVotes[index] > votes[maxVotesIndex]) {
      setMaxVotesIndex(index)
    }
  }

  return (
    <>
      <AnecdoteOfTheDay votes={votes} anecdotes={anecdotes} 
                        selected={selected} 
                        setSelected={setSelected} addVote={addVote} />
      
      <TopAnecdote votes={votes} anecdotes={anecdotes} 
                   maxVotesIndex={maxVotesIndex}
                   setMaxVotesIndex={setMaxVotesIndex} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
