import './App.css'
import { useState, useEffect } from "react"

export default function App() {

  const [page, setPage] = useState("home")

  return (

    <div>

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          NASA
        </div>

        <div className="nav-links">

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("iss")}>
            ISS Station
          </button>

          <button onClick={() => setPage("astronauts")}>
            Astronauts
          </button>

          <button onClick={() => setPage("solar")}>
            Solar System
          </button>

        </div>

      </nav>

      <div className="dashboard">

        {/* HOME */}

        {page === "home" && (

          <section className="page-section">

            <h1 className="main-title">
              NASA SPACE CENTER
            </h1>

            <p className="main-text">
              Explore astronauts, asteroids,
              the ISS station and the Solar System.
            </p>

            <div className="grid">

              <APOD />

              <ISSTracker2 />

              <Asteroids />

            </div>

          </section>

        )}

        {/* ISS */}

        {page === "iss" && (

          <section className="page-section">

            <h1 className="main-title">
              ISS STATION
            </h1>

            <ISSTracker2 />

          </section>

        )}

        {/* ASTRONAUTS */}

        {page === "astronauts" && (

          <section className="page-section">

            <h1 className="main-title">
              ASTRONAUTS
            </h1>

            <PeopleInSpace22 />

          </section>

        )}

        {/* SOLAR */}

        {page === "solar" && (

          <section className="page-section">

            <h1 className="main-title">
              SOLAR SYSTEM
            </h1>

            <div className="grid">

              <Asteroids />

              <AsteroidsCarte />

            </div>

            <div className="card solar-system">

              <h2>
                Solar System Explorer
              </h2>

              <iframe
                src="https://eyes.nasa.gov/apps/solar-system/#/home"
                title="NASA Solar System"
              />

            </div>

          </section>

        )}

      </div>

    </div>

  )

}

/* ========================= */
/* ISS */
/* ========================= */

function ISSTracker2() {

  const [location, setLocation] =
    useState(null)

  useEffect(() => {

    const fetchISS = () => {

      fetch(
        'https://api.wheretheiss.at/v1/satellites/25544'
      )
        .then(r => r.json())
        .then(data => setLocation(data))

    }

    fetchISS()

    const interval =
      setInterval(fetchISS, 10000)

    return () =>
      clearInterval(interval)

  }, [])

  return (

    <div className="iss-card">

      <div className="iss-header">

        <div className="iss-title">
          ISS LIVE TRACKER
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

            <div className="iss-value">
              {location.velocity.toFixed(0)}
              km/h
            </div>

          </div>

          <div className="iss-item">

            <div className="iss-label">
              Altitude
            </div>

            <div className="iss-value">
              {location.altitude.toFixed(0)}
              km
            </div>

          </div>

        </div>

      ) : (

        <p>Loading...</p>

      )}

    </div>

  )

}

/* ========================= */
/* APOD */
/* ========================= */

function APOD() {

  const [pic, setPic] =
    useState(null)

  useEffect(() => {

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`
    )
      .then(r => r.json())
      .then(data => setPic(data))

  }, [])

  return (

    <div className="card">

      <h2>Picture of the Day</h2>

      {pic ? (

        <div>

          <h3>{pic.title}</h3>

          <img
            src={pic.url}
            alt={pic.title}
          />

        </div>

      ) : (

        <p>Loading...</p>

      )}

    </div>

  )

}

/* ========================= */
/* ASTEROIDS */
/* ========================= */


/* ========================= */
/* SOLAR */
/* ========================= */

function AsteroidsCarte() {

  return (

    <div className="card asteroids">

      <h2>
        Asteroids Explorer
      </h2>

      <iframe
        src="https://eyes.nasa.gov/apps/asteroids/#/home"
        title="NASA Asteroids"
      />

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
function PeopleInSpace22() {

  const [people, setPeople] =
    useState([])

  const [selectedPerson, setSelectedPerson] =
    useState(null)

  const [bio, setBio] =
    useState("")

  const [loadingBio, setLoadingBio] =
    useState(false)

  useEffect(() => {

    fetch(
      "https://api.allorigins.win/raw?url=http://api.open-notify.org/astros.json"
    )
      .then(r => r.json())
      .then(data =>
        setPeople(data.people)
      )
      .catch(err =>
        console.log(err)
      )

  }, [])

  useEffect(() => {

    if (!selectedPerson) return

    setLoadingBio(true)

    const wikiName =
      encodeURIComponent(
        selectedPerson.name
      )

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiName}`
    )
      .then(r => r.json())
      .then(data => {

        setBio(
          data.extract ||
          "No biography found."
        )

        setLoadingBio(false)

      })
      .catch(() => {

        setBio(
          "Error loading biography."
        )

        setLoadingBio(false)

      })

  }, [selectedPerson])

  return (

    <>

      <div className="astronaut-grid">

        {people.map(person => (

          <div
            key={person.name}
            className="astronaut-card"
          >

            <div className="astronaut-avatar">
              🧑‍🚀
            </div>

            <h2>
              {person.name}
            </h2>

            <p>
              {person.craft}
            </p>

            <button
              className="astro-btn"
              onClick={() =>
                setSelectedPerson(person)
              }
            >
              More Info
            </button>

          </div>

        ))}

      </div>

      {selectedPerson && (

        <div
          className="astro-screen"
          onClick={() =>
            setSelectedPerson(null)
          }
        >

          <div
            className="astro-screen-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={() =>
                setSelectedPerson(null)
              }
            >
              ✕
            </button>

            <div className="screen-avatar">
              🧑‍🚀
            </div>

            <h1>
              {selectedPerson.name}
            </h1>

            <div className="screen-box">

              <span>
                Spacecraft
              </span>

              <strong>
                {selectedPerson.craft}
              </strong>

            </div>

            <div className="screen-bio">

              <h3>
                Biography
              </h3>

              {loadingBio ? (

                <p>
                  Loading biography...
                </p>

              ) : (

                <p>
                  {bio}
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </>

  )

}