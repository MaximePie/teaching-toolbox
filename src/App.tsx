import './App.css'
import {NavLink, Outlet} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <NavLink to={'/anagrams'} className="Navlink">Anagrames</NavLink>
        <NavLink to={'/parkinson'} className="Navlink">Parkinson</NavLink>
        <NavLink to={'/pygmalion'} className="Navlink">Pygmalion</NavLink>
      </div>
      <Outlet/>
    </div>
  )
}

export default App
