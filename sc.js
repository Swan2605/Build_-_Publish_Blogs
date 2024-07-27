document.addEventListener('DOMContentLoaded', () => {
    const editorOptions = {
        theme: 'snow',
        placeholder: 'Compose your blog post...',
        modules: {
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }
    };

    const quill = new Quill('#editor-container', editorOptions);
    const form = document.getElementById('blogForm');
    const postsContainer = document.getElementById('posts');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('blogTitle').value;
        const content = quill.root.innerHTML;

        if (title && content) {
            const date = new Date().toLocaleDateString();
            const blogPost = {
                title: title,
                content: content,
                date: date,
                category: "Uncategorized"
            };

            savePost(blogPost);
            displayPost(blogPost);

            form.reset();
            quill.root.innerHTML = '';

            alert('Blog post saved!');
           
        } else {
            alert('Please fill in both title and content.');
        }
    });

   
    function savePost(post) {
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    }

    
    function displayPosts() {
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.forEach((post, index) => {
            displayPost(post, index);
        });
    }

    
    function displayPost(post, index) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;
        postElement.appendChild(postTitle);

        const postContent = document.createElement('div');
        postContent.innerHTML = post.content;
        postElement.appendChild(postContent);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deletePost(index);
            postsContainer.removeChild(postElement);
        });
        postElement.appendChild(deleteBtn);

        postsContainer.appendChild(postElement);
    }

    
    function deletePost(index) {
        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        blogPosts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    }

 
    displayPosts();
});
