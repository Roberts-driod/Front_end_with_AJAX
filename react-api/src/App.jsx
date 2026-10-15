import Navbar from './components/Navbar';
import Posts from './components/Posts';
import './App.css';

function App() {
    return (
        <>
            <Navbar />

            <main className="container">
                <h1>Posts</h1>

                <Posts />
            </main>
        </>
    );
}

export default App;