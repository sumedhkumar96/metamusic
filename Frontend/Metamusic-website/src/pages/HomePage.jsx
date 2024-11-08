import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import Header from "../components/Home/Header"
import default_album_art from "../assets/images/default_album_art.png"
import default_artist_image from "../assets/images/default_artist_image.png"

export function HomePage() {
    const [user, setUser] = useOutletContext();
    const [isUserEditPage, setIsUserEditPage] = useState(false);

    // State variables to store the fetched data
    const [topSongs, setTopSongs] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    // Function to fetch top songs
    const fetchTopSongs = async () => {
        try {
            const response = await fetch('http://localhost:3001/top-ten-popular-songs');
            const data = await response.json();
            setTopSongs(data);
        } catch (error) {
            console.error('Error fetching top songs:', error);
        }
    };

    // Function to fetch top artists
    const fetchTopArtists = async () => {
        try {
            const response = await fetch('http://localhost:3001/top-ten-artists');
            const data = await response.json();
            setTopArtists(data);
        } catch (error) {
            console.error('Error fetching top artists:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTopSongs();
        fetchTopArtists();
        // Remove fetchTopFromGenre as it's not being used
    }, []);

    return (
        <>
            <div className="container mx-auto mt-8">
                <Header />
                <h1 className="text-3xl font-semibold m-4">Top Songs</h1>
                <div className="carousel carousel-center w-full">
                    {topSongs.map((song, index) => (
                        <div key={song.id} id={`songcarousel${index}`} className="carousel-item m-4 sm:w-1/3 sm:max-w-60 ld:w-1/5 border border-gray-200 rounded-lg shadow rounded-lg">
                            <a href={song.album_url ?? '#'} target="_blank">
                                <img className="rounded-t-lg sm:w-60 md:w-96 h-auto" src={song.album_art_url ?? default_album_art} alt="album art" />
                                <div className="p-4">
                                    <p className="text-lg font-bold mb-2">{song.title}</p>
                                    <p className="text-base font-semibold mb-2">{song.artist}</p>
                                    <p className="text-sm font-normal text-gray-700">{song.album}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <h1 className="text-3xl font-semibold my-8">Top Artists</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topArtists.map((artist) => (
                        <div key={artist.artist_id} className="card bg-base-100 shadow-xl image-full">
                            <figure><img src={artist.artist_image_url ?? default_artist_image} alt="Artist Image" /></figure>
                            <a className="card-body flex items-center justify-center" href={artist.artist_url ?? "#"} target="_blank">
                                <h2 className="text-lg text-white">{artist.artist_name}</h2>
                            </a>
                        </div>
                    ))}
                </div>


                <h1 className="text-3xl font-semibold my-8">Discover Exciting New Music</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    <div key='top-romantic-songs' className="card bg-base-100 shadow-xl image-full">
                        <figure><img src="https://static01.nyt.com/images/2022/01/13/fashion/07LOVE-BOMBING/07LOVE-BOMBING-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="Romance Image" /></figure>
                        <Link to="/topcharts/romantic" className="card-body flex items-center justify-center">
                            <h2 className="text-lg text-white">Romantic Songs</h2>
                        </Link>
                    </div>

                    <div key='top-workout-songs' className="card bg-base-100 shadow-xl image-full">
                        <figure><img src="https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png" alt="Romance Image" /></figure>
                        <Link to="/topcharts/workout" className="card-body flex items-center justify-center">
                            <h2 className="text-lg text-white">Workout Songs</h2>
                        </Link>
                    </div>

                    <div key='top-dance-songs' className="card bg-base-100 shadow-xl image-full">
                        <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB5dUBq3K-wX_kfVyayCO7WinS6q4Jof-3otcU5i3SQQ&s" alt="Romance Image" /></figure>
                        <Link to="/topcharts/dance" className="card-body flex items-center justify-center">
                            <h2 className="text-lg text-white">Dance Beats</h2>
                        </Link>
                    </div>

                    <div key='top-melancholic-songs' className="card bg-base-100 shadow-xl image-full">
                        <figure><img src="https://esoftskills.com/wp-content/uploads/2024/01/Melancholic.jpg" alt="Romance Image" /></figure>
                        <Link to="/topcharts/melancholic" className="card-body flex items-center justify-center">
                            <h2 className="text-lg text-white">Melancholic Songs</h2>
                        </Link>
                    </div>
                </div>

            </div>

            <footer className="footer footer-center p-4 bg-neutral text-neutral-content">
                <aside>
                    <p>MetaMusic © 2024 - Made With ❤️ by Aditya, Sumedh and Ajinkya</p>
                </aside>
            </footer>
        </>
    );
}
