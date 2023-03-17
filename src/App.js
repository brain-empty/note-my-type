import React from "react";
import { useState } from "react";
import "./App.css"

function App() {
  const [ pendingWords, setPendingWords ] = useState(["Hello", "world"])
  const [ history, setHistory ] = useState ("")
  const [ currentLetterIndex, setCurrentLetterIndex ] = useState(0)
  const [ currentWordIndex, setCurrentWordIndex ] = useState (0)

  function handleTextChange(event) {
    if ( event.target.value == " ") {
      setCurrentWordIndex (currentWordIndex + 1)
      setCurrentLetterIndex ( 0 )
    } else {
      setHistory(history+event.target.value)
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  function getClassName (i, j) {
    // past word
      // wrong word
      // right word

    // active word
      // typed
        // right
        // wrong
      // not typed

    // future word
  }
  return (
    <div>
      {pendingWords.map ( (word, i) => {
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
      })}

      <input type='text' value='' onChange={handleTextChange} />
    </div>
  );
}

export default App;
