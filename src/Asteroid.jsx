import { useEffect, useState } from "react"

export default function Asteroid() {

  const [rocks, setRocks] =
    useState([])

  useEffect(() => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
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

      <h2>
        ASTEROIDS TODAY
      </h2>

      {rocks.length > 0 ? (

        rocks.slice(0, 5).map(rock => (

          <div
            key={rock.id}
            className="asteroid-row"
          >

            <div>

              <h3>
                {rock.name}
              </h3>

              <p>

                Diameter:
                {" "}

                {rock
                  .estimated_diameter
                  .meters
                  .estimated_diameter_max
                  .toFixed(1)}

                m

              </p>

            </div>

          </div>

        ))

      ) : (

        <p>
          Loading...
        </p>

      )}

    </div>

  )

}
