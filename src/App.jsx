import './App.css'
import { useState, useEffect } from "react"


export default function App() {
  return (
    <div className="dashboard">

      <h1>Xacho   NASA Dashboard</h1>

 

      <Counter />

      <ISSTracker2 />
      <PeopleInSpace />
      <APOD />
     <Asteroids />
       <AsteroidsCarte/>
      
<div className="card solar-system">
  <h2> Solar System Explorer</h2>

  <iframe
    src="https://eyes.nasa.gov/apps/solar-system/#/home"
    title="NASA Solar System"
  />
</div>
   
    
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

  const [location, setLocation] =
    useState(null)

  useEffect(() => {

    const fetchISS = () => {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(r => {
        if (!r.ok) throw new Error("Rate limited");
        return r.json();
      })
        .then(data => setLocation(data))
        .catch(err => console.warn(err));
    }

    const interval = setInterval(fetchISS, 10000)
    return () => clearInterval(interval)

  }, [])

  return (

    <div className="iss-card">

      <div className="iss-header">

        <div className="iss-title">

          <svg
            className="iss-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 12h20" />
            <path d="M12 2v20" />
            <circle cx="12" cy="12" r="3" />
          </svg>

          <span>ISS LIVE TRACKER</span>

        </div>

      </div>

      {location ? (

        <div className="iss-grid">

          <div className="iss-item">

            <div className="iss-label">
              Latitude
            </div>

            <div className="iss-value">
              {location.latitude.toFixed(2)}
            </div>

          </div>

          <div className="iss-item">

            <div className="iss-label">
              Longitude
            </div>

            <div className="iss-value">
              {location.longitude.toFixed(2)}
            </div>

          </div>

          <div className="iss-item">

            <div className="iss-label">
              Speed
            </div>

            <div className="iss-value live">
              {location.velocity.toFixed(0)}
              {" "}km/h
            </div>

          </div>

          <div className="iss-item">

            <div className="iss-label">
              Altitude
            </div>

            <div className="iss-value">
              {location.altitude.toFixed(0)}
              {" "}km
            </div>

          </div>

        </div>

      ) : (

        <div className="iss-loading">
          Connecting to ISS...
        </div>

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
function AsteroidsCarte() {
  return (

    <div className="card asteroids">

      <div className="asteroid-header">

        <h2>         Asteroids Explorer</h2>

      </div>

      <iframe
        src="https://eyes.nasa.gov/apps/asteroids/#/home"
        title="NASA Asteroids"
      />

    </div>

  )
}
function APOD() {
  const [pic, setPic] = useState(null)
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])
  return (
    <div className="card">
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type === 'image'
            ? <img src={pic.url} alt={pic.title} style={{ width: '100%' }} />
            : <a href={pic.url} target="_blank">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
function Asteroids() {

  const [rocks, setRocks] =
    useState(null)

  const [selectedRock, setSelectedRock] =
    useState(null)

  useEffect(() => {

    const today =
      new Date().toISOString().split("T")[0]

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`
    )
      .then(r => r.json())
      .then(data => {

        setRocks(
          data.near_earth_objects[today]
        )

      })

  }, [])

  return (

    <div className="space-card">

      <div className="card-header">

        <div className="header-title">

          <span> ASTEROIDS TODAY</span>

        </div>

      </div>

      {rocks ? (

        <div className="asteroid-list">

          {rocks.slice(0, 5).map(rock => (

            <div
              key={rock.id}
              className="asteroid-row"
            >

              <div className="asteroid-info">

                <span className="asteroid-name">
                  {rock.name}
                </span>

                <span className="asteroid-size">

                  Max Diameter:
                  {" "}

                  {rock
                    .estimated_diameter
                    .meters
                    .estimated_diameter_max
                    .toFixed(1)}m

                </span>

              </div>

              <button
                className={`hazard-badge ${
                  rock.is_potentially_hazardous_asteroid
                    ? "danger"
                    : "safe"
                }`}
                onClick={() =>
                  setSelectedRock(rock)
                }
              >

                {rock
                  .is_potentially_hazardous_asteroid
                  ? "Hazardous"
                  : "Safe"}

              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="shimmer-loader">
          Calculating near-Earth trajectories...
        </div>

      )}

      {selectedRock && (

        <div
          className="asteroid-popup-overlay"
          onClick={() =>
            setSelectedRock(null)
          }
        >

          <div
            className="asteroid-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
              alt={selectedRock.name}
            />

            <h2>
              {selectedRock.name}
            </h2>

            <p>

            Diameter:
              {" "}

              {selectedRock
                .estimated_diameter
                .meters
                .estimated_diameter_max
                .toFixed(1)}m

            </p>

            <p>

             Speed:
              {" "}

              {parseFloat(
                selectedRock
                  .close_approach_data[0]
                  .relative_velocity
                  .kilometers_per_hour
              ).toFixed(0)}

              {" "}km/h

            </p>

            <p>

               Miss Distance:
              {" "}

              {parseFloat(
                selectedRock
                  .close_approach_data[0]
                  .miss_distance
                  .kilometers
              ).toFixed(0)}

              {" "}km

            </p>

            <button
              onClick={() =>
                setSelectedRock(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )
}