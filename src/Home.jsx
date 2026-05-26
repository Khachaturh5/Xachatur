import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-5 border-b border-gray-800 bg-[#050816] sticky top-0 z-50">
        
        {/* NASA LOGO */}
        <div className="flex items-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
            alt="NASA"
            className="w-16 h-16 animate-spin"
            style={{ animationDuration: "15s" }}
          />

          <div>
            <h1 className="text-3xl font-bold tracking-widest text-blue-400">
              NASA
            </h1>
            <p className="text-gray-400 text-sm">
              Space Exploration Platform
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex gap-8 text-lg">
          <Link to="/" className="hover:text-blue-400 duration-300">
            Home
          </Link>

          <Link to="/solar" className="hover:text-blue-400 duration-300">
            Solar System
          </Link>

          <Link to="/astronauts" className="hover:text-blue-400 duration-300">
            Astronauts
          </Link>

          <Link to="/iss" className="hover:text-blue-400 duration-300">
            ISS Station
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-extrabold mb-6 text-blue-400">
          Welcome To NASA
        </h1>

        <p className="max-w-3xl mx-auto text-gray-300 text-xl leading-9">
          Discover planets, astronauts, satellites and the International Space
          Station with live space information and amazing NASA visuals.
        </p>

        <img
          src="https://images-assets.nasa.gov/image/iss063e081233/iss063e081233~large.jpg"
          alt="ISS"
          className="w-[900px] mx-auto mt-14 rounded-3xl shadow-2xl border border-blue-500"
        />
      </section>
    </div>
  );
}

export default Home;