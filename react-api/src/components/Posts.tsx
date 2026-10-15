
import { useState, useEffect } from 'react';
import Comments from './Comments';
import type { Post } from '../types/api';

function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
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

                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error: unknown) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Radās nezināma kļūda.'
                );
            } finally {
                setLoading(false);
            }
        }

        void loadPosts();
    }, []);

    return (
        <section className="posts">
            {loading && <div className="spinner" />}

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
