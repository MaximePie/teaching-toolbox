import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

type Anagram = {
  word: string
  anagram: string
}
const solvableAnagrams = [
  {word: 'EWF', anagram: 'WEF'},
  {word: 'ALAM', anagram: 'LAMA'},
  {word: 'ELGAIS', anagram: 'GAELIS'},
  {word: 'OMEMERI', anagram: 'MEMOIRE'},
  {word: 'CRVEEUA', anagram: 'CERVEAU'},
  {word: 'EPADOGIGE', anagram: 'PEDAGOGIE'},
  {word: 'OFMRTAOIN', anagram: 'FORMATION'},
  {word: 'NSOAINASCCEN', anagram: 'CONNAISSANCE'},
]

const unsolvableAnagrams = [
  {word: 'AWF', anagram: 'ZZZZZZZZ'},
  {word: 'ALOM', anagram: 'ZZZZZZZZ'},
  {word: 'OLGAIS', anagram: 'ZZZZZZZZ'},
  {word: 'YMAMERI', anagram: 'ZZZZZZZZ'},
  {word: 'CBVEIUA', anagram: 'ZZZZZZZZ'},
  {word: 'EJATOGAGE', anagram: 'ZZZZZZZZ'},
  {word: 'QFCRTAJIN', anagram: 'ZZZZZZZZ'},
  {word: 'NSOAINASCCEN', anagram: 'ZZZZZZZZ'},
]


function Anagrams() {
  const [anagrams, setAnagrams] = React.useState<Anagram[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answer, setAnswer] = React.useState('')

  React.useEffect(() => {
    // Set anagrams to solvableAnagrams in 70% of the cases
    const random = Math.random()
    if (random < 0.7) {
      setAnagrams(solvableAnagrams)
    } else {
      setAnagrams(unsolvableAnagrams)
    }
  }, [])

  const currentAnagram = anagrams[currentIndex]
  return (
    <div>
      {currentAnagram && (
        <div className="Anagram">
          <p>{currentAnagram?.word} = ?</p>
          <label>
            Réponse :
            <input
              className="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </label>
          <button
            onClick={onSubmitted}
            className="submit"
          >
            Valider
          </button>
        </div>
      )}
      {currentIndex === anagrams.length - 1 && (
        <div className="End">
          <p>Fin du test</p>
        </div>
      )}
    </div>
  )

  function onSubmitted() {
    const lowerCaseAnswer = answer.toLowerCase()
    if (lowerCaseAnswer === currentAnagram?.anagram.toLowerCase()) {
      alert('Bonne réponse !')
      setCurrentIndex(currentIndex + 1)
      setAnswer('')
    } else {
      alert('Mauvaise réponse !')
      if (lowerCaseAnswer === '') {
        setCurrentIndex(currentIndex + 1)
        setAnswer('')
      }
    }
  }
}

function Pygmalion() {
  return (
    <div>
      <p>Plus puissant que le Bien, plus mauvais que le Mal, les pauvres en ont, les riches en ont besoin. Qu'est-ce ?</p>

      <i className="instructions">Une fois que vous avez trouvé la réponse, revenez dans la salle principale</i>
    </div>
  )
}

function Parkinson() {
  return (
    <div>
      <p>Tourne-moi sur le côté, et je suis tout. Coupe-moi en deux et je ne suis rien. Que suis-je ?</p>
      <i className="instructions">Une fois que vous avez trouvé la réponse, revenez dans la salle principale</i>

    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "anagrams",
        element: <Anagrams/>
      },
      {
        path: "parkinson",
        element: <Parkinson/>
      },
      {
        path: "pygmalion",
        element: <Pygmalion/>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
