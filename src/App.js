import React from "react";
import { useState } from "react";
import "./App.css"

function App() {
  const [ pendingWords, setPendingWords ] = useState(["Hello1", "world"])
  const [ history, setHistory ] = useState (["done", "this1"])
  const [ letterHistory, setLetterHistory ] = useState("")
  const [ currentLetterIndex, setCurrentLetterIndex ] = useState(0)
  const [ currentWordIndex, setCurrentWordIndex ] = useState (0)

  function handleTextChange(event) {
    event.target.value = event.target.value.split("").pop() // recieving the last char of the event value

    if ( event.target.value == " ") {
      setCurrentWordIndex (currentWordIndex + 1)
      setCurrentLetterIndex ( 0 )
      setLetterHistory ( "" )

      setHistory ( [ ...history, pendingWords.shift() ] )

      // pendingWords.shift();
      setPendingWords( pendingWords )
    } else {
      setLetterHistory( letterHistory + event.target.value )
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  function getClassName (i, j) {
    // past word
    if ( i < currentWordIndex ) {
      return "historyRight";
    }
      // wrong word

    // active word
    else if ( i == currentWordIndex ) {
      console.log(j)
      if ( j < currentLetterIndex ) {
        return "currentWordCorrect"
      }
      // else if (  ) {
      //   return "currentWordWrong"
      // }
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
          }
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
