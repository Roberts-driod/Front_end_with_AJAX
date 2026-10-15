import { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    function loadPosts() {
        setLoading(true);

        fetch('http://127.0.0.1:8000/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('Kļūda:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <section>

            {loading && (
                <div className="spinner"></div>
            )}

            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Posts;