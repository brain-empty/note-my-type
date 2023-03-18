import React from "react";
import { useState } from "react";
import "./App.css"

function App() {
  const [ pendingWords, setPendingWords ] = useState(["Hello1", "world", "okay", "rip", "bozo"])
  const [ history, setHistory ] = useState ([])

  const [ wordCorrect, setWordCorrect ] = useState ([])
  const [ letterCorrect, setLetterCorrect ] = useState ([])

  const [ letterHistory, setLetterHistory ] = useState("")
  const [ currentLetterIndex, setCurrentLetterIndex ] = useState(0)
  const [ currentWordIndex, setCurrentWordIndex ] = useState (0)

  function handleTextChange(event) {
    event.target.value = event.target.value.split("").pop() // recieving the last char of the event value

    if ( event.target.value == " ") {
      setCurrentWordIndex (currentWordIndex + 1)
      setCurrentLetterIndex ( 0 )
      setLetterHistory ( "" )

      if ( wordCorrect[currentWordIndex] == null ){
        setWordCorrect ([...wordCorrect, 1])
      }
      setLetterCorrect ([])

      setHistory ( [ ...history, pendingWords.shift() ] )

      setPendingWords( pendingWords )
    } else {
      setLetterCorrect([...letterCorrect, 0])
      const expectedCurrentLetter = pendingWords[0][currentLetterIndex]

      if ( event.target.value != expectedCurrentLetter ){
        if ( wordCorrect[currentWordIndex] == null ){
          setWordCorrect([...wordCorrect, 0])
        }
        setLetterCorrect([...letterCorrect, 0])
      }
      else {
        setLetterCorrect([...letterCorrect, 1])
      }

      setLetterHistory( letterHistory + event.target.value )
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  function getClassName (i, j) {
    // past word
    if ( i < currentWordIndex && wordCorrect[ i ]  == 1) {
      return "historyRight";
    } 
    else if ( i < currentWordIndex && wordCorrect[ i ] == 0) { 
      return "historyWrong"
    }

    // active word
    else if ( i == currentWordIndex ) {
      if ( letterCorrect[j] == 1 ) {
        return "currentWordCorrect"
      }
      else if ( letterCorrect[j] == 0 ) {
        return "currentWordWrong"
      }
      // else if (  ) {
      //   return "currentWordExtra"
      // } 
      else {
        return "currentWordPending";
      }
    }

    // future word
    else {
      return "futureWord";
    }
  }
 
  function renderLetters ( word, i ) {
      return(
        <>
          {
            word.split("").map((letter, j) => {
              return(
                <>
                  <span className={getClassName(i, j)} >{letter}</span>
                </>
              )
            })
          } <></>
        </> 
      )
  }

  return (
    <div>
    {history.map ((word, i) => renderLetters(word, i))}
    {pendingWords.map ((word, i ) => renderLetters(word, i + history.length ))}

    <input type='text' value={letterHistory} onChange={handleTextChange} />
    </div>
  );
}

export default App;
