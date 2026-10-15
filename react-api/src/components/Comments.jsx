
import { useState } from 'react';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    async function loadComments() {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/posts/${postId}/comments`
            );

            if (!response.ok) {
                throw new Error('Neizdevās ielādēt komentārus.');
            }

            const data = await response.json();
            setComments(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function toggleComments() {
        if (visible) {
            setVisible(false);
            return;
        }

        setVisible(true);

        // Ielādējam komentārus tikai pirmajā atvēršanas reizē.
        if (comments.length === 0 && !error) {
            await loadComments();
        }
    }

    return (
        <div className="comments-section">
            <button
                className="comments-button"
                onClick={toggleComments}
            >
                {visible ? 'Paslēpt komentārus' : 'Rādīt komentārus'}
            </button>

            {visible && (
                <div className="comments">
                    {loading && <div className="spinner"></div>}

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    {!loading && !error && comments.length === 0 && (
                        <p>Šim postam vēl nav komentāru.</p>
                    )}

                    {!loading && comments.map(comment => (
                        <div className="comment" key={comment.id}>
                            <strong>User ID: {comment.user_id}</strong>
                            <p>{comment.content}</p>
                        </div>
                    ))}

                    {error && (
                        <button onClick={loadComments}>
                            Mēģināt vēlreiz
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Comments;
