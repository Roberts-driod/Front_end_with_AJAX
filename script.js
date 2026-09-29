const loadPostsButton = document.getElementById('loadPosts');
const postsContainer = document.getElementById('posts');

loadPostsButton.addEventListener('click', loadPosts);

function loadPosts() {

    fetch('http://127.0.0.1:8000/api/posts')
        .then(response => response.json())
        .then(posts => {

            postsContainer.innerHTML = '';

            posts.forEach(post => {

                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>

                    <button onclick="loadComments(${post.id})">
                        Rādīt komentārus
                    </button>

                    <div id="comments-${post.id}" class="comments"></div>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Kļūda:', error);
        });
}

function loadComments(postId) {

    fetch(`http://127.0.0.1:8000/api/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {

            const commentsContainer =
                document.getElementById(`comments-${postId}`);

            commentsContainer.innerHTML = '';

            if (comments.length === 0) {
                commentsContainer.innerHTML =
                    '<p class="no-comments">Šim postam nav komentāru.</p>';
                return;
            }

            comments.forEach(comment => {

                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');

                commentElement.innerHTML = `
                    <strong>User ID: ${comment.user_id}</strong>
                    <p>${comment.content}</p>
                `;

                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Kļūda:', error);
        });
}

// Piemērs ar XMLHttpRequest un fetch() + Async/Await :

function loadPostsXHR() {
    const xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'http://127.0.0.1:8000/api/posts'
    );

    xhr.onload = function () {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.responseText);

            console.log(posts);
        }
    };

    xhr.onerror = function () {
        console.error('Kļūda pieprasījumā');
    };

    xhr.send();
}

async function loadPostsAsync() {

    try {

        const response = await fetch(
            'http://127.0.0.1:8000/api/posts'
        );

        const posts = await response.json();

        console.log(posts);

    } catch (error) {

        console.error('Kļūda:', error);

    }
}