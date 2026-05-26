import './App.css'
import { useState, useEffect } from "react";

export default function App() {

  const [page, setPage] = useState("home")

  return (

    <div>

      {/* NAVBAR */}

      <nav className="navbar">

      <div className="logo-box">

  <img
    src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
    alt="NASA"
    className="nasa-logo"
  />

  <div className="logo-text">
    NASA
  </div>

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

              <ISSTracker2 />
              <div></div>
              <APOD />






              <Asteroids />





              <NextLaunch />




              <ISSLiveFeed />


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
           
            <ISSInfoCard />
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
              <SolarSystemCard />



    <SolarPlanets />
          </section>

        )}

      </div>

    </div>

  )

}


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
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [bio, setBio] = useState("");
  const [loadingBio, setLoadingBio] = useState(false);
  const [loading, setLoading] = useState(true);

  // 👉 fallback avatar (եթե նկար չկա)
  const getAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0b3d91&color=fff&size=256`;

  // 🚀 astronauts API
  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true")
      .then((r) => r.json())
      .then((data) => {
        setPeople(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 📖 wiki bio
  useEffect(() => {
    if (!selectedPerson) return;

    setLoadingBio(true);

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        selectedPerson.name
      )}`
    )
      .then((r) => r.json())
      .then((data) => {
        setBio(data.extract || "No biography found.");
        setLoadingBio(false);
      })
      .catch(() => {
        setBio("Error loading biography.");
        setLoadingBio(false);
      });
  }, [selectedPerson]);

  return (
    <div>

      {/* GRID like planets */}
      {loading ? (
        <p className="loading-text">Loading astronauts...</p>
      ) : (
        <div className="planet-grid">

          {people.map((person) => (
            <div className="planet-card" key={person.id}>

              {/* 👇 IMAGE FIX HERE */}
              <img
                src={person.profile_image || getAvatar(person.name)}
                alt={person.name}
              />

              <div className="planet-content">
                <h2>{person.name}</h2>

                <p>
                  {person.nationality ||
                    person.type ||
                    "Space Crew"}
                </p>

                <button
                  className="planet-btn"
                  onClick={() => setSelectedPerson(person)}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POPUP like planets */}
      {selectedPerson && (
        <div
          className="planet-popup-overlay"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="planet-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="planet-close"
              onClick={() => setSelectedPerson(null)}
            >
              ✕
            </button>

            <img
              src={
                selectedPerson.profile_image ||
                getAvatar(selectedPerson.name)
              }
              alt={selectedPerson.name}
            />

            <h1>{selectedPerson.name}</h1>

            <p>
              {selectedPerson.nationality ||
                selectedPerson.type ||
                "Space Crew"}
            </p>

            <h3>Biography</h3>

            {loadingBio ? (
              <p>Loading...</p>
            ) : (
              <p>{bio}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export { PeopleInSpace22 };
function ISSInfoCard() {

  return (

    <div className="card iss-info-card">

      <img
        src="https://images-assets.nasa.gov/image/iss056e201248/iss056e201248~large.jpg"
        alt="ISS"
        className="iss-image"
      />

      <div className="iss-content">

        <h2>
          International Space Station
        </h2>

        <p>
          The International Space Station (ISS)
          is the largest human-made structure
          ever built in space. It travels in
          low Earth orbit and acts as a giant
          science laboratory where astronauts
          live, work and perform important
          experiments.
        </p>

        <p>
          The ISS was built through international
          cooperation between NASA (United States),
          Roscosmos (Russia), ESA (Europe),
          JAXA (Japan) and CSA (Canada).
          Different countries worked together
          to create one of the greatest engineering
          achievements in history.
        </p>

        <p>
          Construction of the station began in
          1998 and astronauts have continuously
          lived aboard the ISS since the year 2000.
          This makes it the longest continuously
          inhabited human outpost in space.
        </p>

        <p>
          The station circles Earth at an altitude
          of around 400 kilometers and moves at
          incredible speed. Because of this,
          astronauts aboard the ISS see about
          16 sunrises and sunsets every day.
      
        
          Scientists on the ISS study biology,
          medicine, climate, physics, robotics,
          food systems and the effects of
          microgravity on the human body.
          Research from the ISS helps improve
          life on Earth and prepares humans for
          future missions to the Moon and Mars.
        
  </p>

        <p>
          The station contains sleeping areas,
          laboratories, exercise equipment,
          communication systems, docking ports
          for spacecraft and giant solar panels
          that generate electricity from sunlight.
          Early into the space age and ensuing space race the US and USSR began to find opportunities for potential collaborations in outer space. This culminated in the 1975 Apollo–Soyuz Test Project, the first docking of spacecraft from two different spacefaring nations. The ASTP was considered a success, and further joint missions were also contemplated.


One such concept was International Skylab, which proposed launching the backup Skylab B space station for a mission that would see 
 multiple visits by both Apollo and Soyuz crew vehicles. More ambitious was the Skylab-Salyut Space Laboratory, which proposed docking
  the Skylab B to a Soviet Salyut space station. Falling budgets and rising Cold War tensions in the late 1970s saw these concepts fall by the wayside, along with another plan to have the Space Shuttle dock with a Salyut space station.

In the early 1980s, NASA planned to launch a modular space station called Freedom as a counterpart to the Salyut and Mir space stations. 

</p><p>
In 1984 the European Space Agency (ESA) was invited to participate in Space Station Freedom, and the ESA approved the Columbus laboratory by 1987. The Japanese Experiment Module (JEM), or Kibō, was announced in 1985, as part of the Freedom space station in response to a NASA request in 1982.

In early 1985, science ministers from the ESA countries approved the Columbus program, the most ambitious effort in space undertaken by that organization at the time. The plan spearheaded by Germany and Italy included a module which would be attached to Freedom, and with the capability to evolve into a full-fledged European orbital outpost before the end of the century.

Increasing costs threw these plans into doubt in the early 1990s. Congress was unwilling to provide enough money to build and operate Freedom, and demanded NASA increase international participation 
to defray the rising costs or they would cancel the entire project outright.

Simultaneously, the USSR was conducting planning for the Mir-2 space station, and had begun constructing modules for the new station by the mid-1980s. 
However the collapse of the Soviet Union required these plans to be greatly downscaled, and soon Mir-2 was in danger of never being launched at all. 
With both space station projects in jeopardy, American and Russian officials met and proposed they be combined.
        </p>
        
<div className="iss-stats">

  <div className="iss-stat">
    <span className="stat-title">
      Orbit Height
    </span>

    <span className="stat-value">
      ~400 km above Earth
    </span>
  </div>

  <div className="iss-stat">
    <span className="stat-title">
      Speed
    </span>

    <span className="stat-value">
      27,600 km/h
    </span>
  </div>

  <div className="iss-stat">
    <span className="stat-title">
      Orbit Time
    </span>

    <span className="stat-value">
      93 minutes
    </span>
  </div>

  <div className="iss-stat">
    <span className="stat-title">
      Daily Orbits
    </span>

    <span className="stat-value">
      15.5 times around Earth
    </span>
  </div>

  <div className="iss-stat">
    <span className="stat-title">
      Permanent Crew
    </span>

    <span className="stat-value">
      Since 2000
    </span>
  </div>

  <div className="iss-stat">
    <span className="stat-title">
      Energy Source
    </span>

    <span className="stat-value">
      Giant Solar Arrays
    </span>
  </div>

</div>

      </div>

    </div>

  )

}
function NextLaunch() {
  const [launch, setLaunch] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1&ordering=net&format=json')
      .then(r => r.json())
      .then(data => {
        const l = data.results?.[0]
        if (l) setLaunch(l)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!launch) return
    function tick() {
      const now = Date.now()
      const target = new Date(launch.net).getTime()
      const diff = target - now
      if (diff <= 0) { setCountdown('LAUNCH!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`)
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [launch])

  return (
    <div className="card">
      <h2>Next Rocket Launch</h2>
      {launch ? (
        <div className="launch-content">
          <div className="launch-name">{launch.name}</div>
          <div className="launch-provider">{launch.launch_service_provider?.name}</div>
          <div className="launch-pad"> {launch.pad?.location?.name}</div>
          <div className="launch-countdown">{countdown}</div>
          <div className="label">{new Date(launch.net).toUTCString()}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
function ISSLiveFeed() {
  const [show, setShow] = useState(false)

  return (
    <div className="card">
      <h2>📺 ISS Live Camera</h2>

      <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: 12 }}>
        Live HD stream from the International Space Station (NASA HDEV)
      </p>

      {!show ? (
        <button className="counter-btn" onClick={() => setShow(true)}>
          ▶ Load Live Stream
        </button>
      ) : (
        <div className="iss-feed-wrapper">

          <iframe
            src="https://www.youtube.com/embed/uwXgcTc8oY8?autoplay=1&mute=1"
            width="560"
            height="315"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              aspectRatio: '16/9',
              border: 'none',
              borderRadius: 8,
            }}
          />

          <p className="label" style={{ marginTop: 8 }}>
            <span className="live">● LIVE</span> — NASA Johnson Space Center
          </p>

        </div>
      )}
    </div>
  )
}
function SolarPlanets() {

  const [selectedPlanet, setSelectedPlanet] =
    useState(null)

 const planets = [

  {
    name: "Sun",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys8.jpg",

    short:
      "The massive star at the center of our Solar System.",

    info:
      "The Sun is the star at the center of the Solar System and the main source of energy for life on Earth. It is a massive sphere of extremely hot plasma powered by nuclear fusion in its core. The Sun radiates light, heat and ultraviolet energy across space, making life on Earth possible. It is the largest object in the Solar System, with a diameter of about 1.39 million kilometers, around 109 times larger than Earth. Its mass is about 330,000 times greater than Earth's and makes up nearly all of the Solar System's total mass. The Sun is made mostly of hydrogen and helium. It formed around 4.6 billion years ago from a giant molecular cloud and is classified as a G-type main-sequence star. Every second, the Sun converts huge amounts of hydrogen into helium, releasing enormous energy. The surface temperature of the Sun is around 5,500°C while the core reaches nearly 15 million °C. In the distant future, the Sun will expand into a red giant star before eventually becoming a white dwarf."
  },

  {
    name: "Mercury",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",

    short:
      "The closest planet to the Sun.",

    info:
      "Mercury is the closest planet to the Sun and also the smallest planet in the Solar System. It has a rocky surface filled with ancient craters similar to the Moon. Because Mercury has almost no atmosphere, temperatures change dramatically between day and night. During the day temperatures can rise above 430°C, while at night they can fall below −180°C. Mercury completes one orbit around the Sun in only 88 Earth days, making it the fastest planet in the Solar System. The planet has a large iron core and a weak magnetic field. Despite being close to the Sun, some craters near its poles contain frozen water ice."
  },

  {
    name: "Venus",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",

    short:
      "The hottest planet in the Solar System.",

    info:
      "Venus is the second planet from the Sun and is often called Earth's sister planet because of its similar size and structure. However, conditions on Venus are extremely harsh. The planet is covered by thick clouds of carbon dioxide and sulfuric acid, creating a powerful greenhouse effect that traps heat. Surface temperatures are around 465°C, making Venus even hotter than Mercury. Venus rotates very slowly and in the opposite direction compared to most planets, meaning the Sun rises in the west and sets in the east. A single day on Venus is longer than a Venusian year."
  },

  {
    name: "Earth",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",

    short:
      "Our home planet full of life.",

    info:
      "Earth is the third planet from the Sun and the only known planet that supports life. About 71% of Earth's surface is covered by water, giving it the nickname 'The Blue Planet.' Earth has a breathable atmosphere rich in oxygen and a magnetic field that protects life from harmful solar radiation. The planet formed around 4.5 billion years ago and has one natural satellite, the Moon. Earth's surface constantly changes because of volcanoes, earthquakes, oceans and weather systems. Scientists believe millions of different species have lived on Earth throughout its long history."
  },

  {
    name: "Mars",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",

    short:
      "The famous red planet.",

    info:
      "Mars is the fourth planet from the Sun and is known as the Red Planet because of iron oxide dust covering its surface. Mars has giant volcanoes, enormous canyons and frozen polar caps. Olympus Mons on Mars is the tallest volcano in the Solar System. The planet has two small moons called Phobos and Deimos. Scientists believe Mars once had rivers, lakes and oceans of liquid water billions of years ago. Because of this, Mars is one of the most important planets in the search for ancient microbial life and future human exploration."
  },

  {
    name: "Jupiter",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",

    short:
      "The largest planet in the Solar System.",

    info:
      "Jupiter is the fifth planet from the Sun and the largest planet in the Solar System. It is a giant world made mostly of hydrogen and helium gas. Jupiter is famous for the Great Red Spot, an enormous storm larger than Earth that has been raging for centuries. The planet has a very strong magnetic field and dozens of moons. Ganymede, one of Jupiter's moons, is the largest moon in the Solar System and is even bigger than Mercury. Jupiter's powerful gravity helps protect the inner planets by pulling in asteroids and comets."
  },

  {
    name: "Saturn",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",

    short:
      "The planet with beautiful rings.",

    info:
      "Saturn is the sixth planet from the Sun and is famous for its spectacular rings made of ice, rock and dust particles. Saturn is a gas giant mostly composed of hydrogen and helium. It is so light that it would float in water if a giant ocean existed. Saturn has more than 140 known moons, including Titan, which has a thick atmosphere and lakes of liquid methane. Strong winds and giant storms move through Saturn's atmosphere, creating beautiful cloud patterns."
  },

  {
    name: "Uranus",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",

    short:
      "A cold icy giant planet.",

    info:
      "Uranus is the seventh planet from the Sun and is known for its pale blue-green color caused by methane gas in its atmosphere. Uranus is unique because it rotates on its side, likely due to a massive collision long ago. This unusual tilt causes extreme seasons that can last over 20 Earth years. Uranus is an icy giant made of water, ammonia and methane ices deep inside. The planet is surrounded by faint rings and has many moons named after characters from literature."
  },

  {
    name: "Neptune",

    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",

    short:
      "The farthest known planet from the Sun.",

    info:
      "Neptune is the eighth and farthest major planet from the Sun in the Solar System. It is a dark blue icy giant with extremely powerful winds that can reach over 2,000 kilometers per hour, making them the fastest winds in the Solar System. Neptune has a cold atmosphere filled with hydrogen, helium and methane gas. The planet was discovered through mathematical calculations before astronomers directly observed it through telescopes in 1846. Neptune also has faint rings and several moons, including Triton, which orbits in the opposite direction of Neptune's rotation."
  }

]
  return (

    <>

      <div className="planet-grid">

        {planets.map((planet) => (

          <div
            className="planet-card"
            key={planet.name}
          >

            <img
              src={planet.image}
              alt={planet.name}
            />

            <div className="planet-content">

              <h2>
                {planet.name}
              </h2>

              <p>
                {planet.short}
              </p>

              <button
                className="planet-btn"
                onClick={() =>
                  setSelectedPlanet(planet)
                }
              >
                More Info
              </button>

            </div>

          </div>

        ))}

      </div>

      {selectedPlanet && (

        <div
          className="planet-popup-overlay"
          onClick={() =>
            setSelectedPlanet(null)
          }
        >

          <div
            className="planet-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="planet-close"
              onClick={() =>
                setSelectedPlanet(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
            />

            <h1>
              {selectedPlanet.name}
            </h1>

            <p>
              {selectedPlanet.info}
            </p>

          </div>

        </div>

      )}

    </>

  )

}
function SolarSystemCard() {

  return (

    <div className="card solar-info-card">

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Planets2013.svg"
        alt="Solar System"
        className="solar-image"
      />

      <div className="solar-content">

        <h2>
          Solar System
        </h2>

        <p>
          The Solar System is a planetary system
          centered around the Sun. It includes
          eight planets, dwarf planets, moons,
          asteroids, comets and billions of
          smaller objects traveling through space.
        </p>

        <p>
          The Sun contains nearly all of the
          Solar System’s mass and provides the
          energy that supports life on Earth.
          The planets orbit around the Sun due
          to its powerful gravitational force.
        </p>

        <p>
          The four inner planets —
          Mercury, Venus, Earth and Mars —
          are rocky terrestrial planets.
          The outer planets —
          Jupiter, Saturn, Uranus and Neptune —
          are giant gas and ice worlds.
        </p>

        <p>
          Jupiter is the largest planet in the
          Solar System, while Saturn is famous
          for its spectacular rings. Uranus
          rotates on its side and Neptune has
          some of the strongest winds ever
          discovered.
        </p>

        <p>
          Beyond the planets are asteroid belts,
          icy comets and distant regions such as
          the Kuiper Belt and the Oort Cloud.
          Scientists continue exploring the Solar
          System using satellites, rovers and
          deep-space probes launched by NASA and
          other space agencies.
        </p>

        <div className="solar-stats">

          <div className="solar-stat">
            <span className="stat-title">
              Center Star
            </span>

            <span className="stat-value">
              Sun
            </span>
          </div>

          <div className="solar-stat">
            <span className="stat-title">
              Main Planets
            </span>

            <span className="stat-value">
              8
            </span>
          </div>

          <div className="solar-stat">
            <span className="stat-title">
              Largest Planet
            </span>

            <span className="stat-value">
              Jupiter
            </span>
          </div>

          <div className="solar-stat">
            <span className="stat-title">
              Age
            </span>

            <span className="stat-value">
              4.6 Billion Years
            </span>
          </div>

          <div className="solar-stat">
            <span className="stat-title">
              Hottest Planet
            </span>

            <span className="stat-value">
              Venus
            </span>
          </div>

          <div className="solar-stat">
            <span className="stat-title">
              Home Planet
            </span>

            <span className="stat-value">
              Earth
            </span>
          </div>

        </div>

      </div>

    </div>

  )

}