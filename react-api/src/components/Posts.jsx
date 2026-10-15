
import { useState, useEffect } from 'react';
import Comments from './Comments';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadPosts() {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(
                    'http://127.0.0.1:8000/api/posts'
                );

                if (!response.ok) {
                    throw new Error('Neizdevās ielādēt postus.');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    return (
        <section className="posts">
            {loading && <div className="spinner"></div>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && posts.map(post => (
                <article className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>

                    <Comments postId={post.id} />
                </article>
            ))}
        </section>
    );
}

export default Posts;
