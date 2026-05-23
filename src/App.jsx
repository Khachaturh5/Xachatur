import './App.css'
import { useState, useEffect } from "react"

export default function App() {
  return (
    <div className="dashboard">

      <h1>Xacho 🚀 NASA Dashboard</h1>

      <Coordinates latitude="42.06" />
      <Nov longitude="11111" />

      <Name />
      <Counter />

      <ISSTracker2 />
      <PeopleInSpace />
    <APOD />
<Astronauts />
<Asteroids />
      <SolarSystem />

      <Age />

    </div>
  )
}

function Coordinates(props) {
  return (
    <div>
      <p>Latitude: {props.latitude}</p>
    </div>
  )
}

function Nov(props) {
  return (
    <div>
      <p>Longitude: {props.longitude}</p>
    </div>
  )
}

function Name() {
  return (
    <div>
      <h1>Xachatur</h1>
      <h1>Karen</h1>
    </div>
  )
}

function Age() {
  return (
    <div>
      <h1>16</h1>
      <h1>22</h1>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}

function ISSTracker2() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then(r => r.json())
      .then(data => setLocation(data))
  }, [])

  return (
    <div className='card'>
      <h2>ISS Position 🛰️</h2>

      {location ? (
        <p>
          {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
function PeopleInSpace() {
  const [people, setPeople] = useState(null)

  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className="card">
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} - {person.craft}
            </li>
          ))}
        </ul>
      ) : <p>Loading...</p>}
    </div>
  )
}
function Astronauts() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetch("https://api.allorigins.win/raw?url=http://api.open-notify.org/astros.json")
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className="card">
      <h2>👨‍🚀 Astronauts in Space</h2>

      {people.map(p => (
        <div key={p.name} className="astro-card">
          <h3>{p.name}</h3>
          <p>🚀 {p.craft}</p>
        </div>
      ))}
    </div>
  )
}
function Asteroids() {
  const [rocks, setRocks] = useState([])

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
    )
      .then(r => r.json())
      .then(data => {
        const arr = Object.values(data.near_earth_objects)[0]
        setRocks(arr)
      })
  }, [])

  return (
    <div className="card">
      <h2>☄️ Near Earth Asteroids</h2>

      {/* NASA Eyes Link */}
      <a
        href="https://eyes.nasa.gov/apps/asteroids/#/home"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#00bfff",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        🚀 Open NASA Eyes on Asteroids
      </a>

      {rocks.map(a => (
        <div key={a.id} className="astro-card">
          <h3>{a.name}</h3>

          <p>
            Diameter:{" "}
            {a.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m
          </p>

          <p>
            Hazard:{" "}
            {a.is_potentially_hazardous_asteroid
              ? "⚠️ Yes"
              : "No"}
          </p>
        </div>
      ))}
    </div>
  )
}
function APOD() {
  const [pic, setPic] = useState(null)

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])

  return (
    <div className="card">
      <h2>🌌 NASA Picture of the Day</h2>

      {pic ? (
        <div>
          <h3>{pic.title}</h3>

          {pic.media_type === "image" ? (
            <img src={pic.url} style={{ width: "100%" }} />
          ) : (
            <a href={pic.url}>Watch video</a>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

function SolarSystem() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://eyes.nasa.gov/apps/solar-system/#/sc_osiris_rex?rate=1814400&time=2021-02-17T21:06:45.412+00:00"
        title="NASA"
        style={{
          width: "100%",
          height: "100%",
          border: "none"
        }}
      />
    </div>
  )
}