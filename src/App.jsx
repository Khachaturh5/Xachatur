import './App.css'
import{useState,useEffect} from "react"
const date = "May 20"
export default function App() {
  return(
    <div className="dashboard">
      <h1>Xacho</h1>
     <Date latitude="42.06" />
    <Nov logitut="11111"/>
    <Name />
    <Counter />
    <ISSTracker2 />
<Age />
</div>
  )
}
function Date(promp) {
  return(
    
    <div>
 <p>{promp.latitude}</p>
    </div>
  )
}
function Name() {
  return(
    <div>
      <h1>Xachatur</h1>
      <h1>Karen</h1>
    </div>
  )
}
function Age() {
  return(
    <div>
      <h1>16</h1>
      <h1>22</h1>
    </div>
  )
}
function Nov(promp) {
  <div>
    <h1>
      {promp.logitut}
    </h1>
  </div>
}
function Counter() {
  const [count, setCount]= useState(0);

  return (
    <button onClick={() => setCount(count +1)}>
 Cliced{count} times
    </button>
  )
}
function ISSTracker1() {
  useEffect(() => {
    console.log("component loaded");
  }, [])
  return <div className='card'><h2>ISS  Position</h2></div>
}
function ISSTracker2(){
  const [location,setLocation] = useState(null)

  useEffect (() => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(r =>r.json())
    .then(data => setLocation(data))
  }, [])

  return (
    <div className='card'>
<h2>ISS Position</h2>
{location ? (
  <p>{location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}</p>
) : (
  <p>Loadig...</p>
)}
    </div>
  )
}