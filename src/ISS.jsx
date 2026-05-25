import { useEffect, useState } from "react"

export default function ISS() {

  const [location, setLocation] =
    useState(null)

  useEffect(() => {

    fetch(
      "https://api.wheretheiss.at/v1/satellites/25544"
    )
      .then(r => r.json())
      .then(data => setLocation(data))

  }, [])

  return (

    <div className="iss-card">

      <h2>
        ISS LIVE TRACKER
      </h2>

      {location ? (

        <div className="iss-grid">

          <div className="iss-item">

            <span>
              Latitude
            </span>

            <h3>
              {location.latitude.toFixed(2)}
            </h3>

          </div>

          <div className="iss-item">

            <span>
              Longitude
            </span>

            <h3>
              {location.longitude.toFixed(2)}
            </h3>

          </div>

          <div className="iss-item">

            <span>
              Speed
            </span>

            <h3>
              {location.velocity.toFixed(0)}
              {" "}km/h
            </h3>

          </div>

          <div className="iss-item">

            <span>
              Altitude
            </span>

            <h3>
              {location.altitude.toFixed(0)}
              {" "}km
            </h3>

          </div>

        </div>

      ) : (

        <p>
          Loading ISS...
        </p>

      )}

    </div>

  )

}