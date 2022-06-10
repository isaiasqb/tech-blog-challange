//FUNCTIONALITY FOR Editing post
async function editPost(event) {
  event.preventDefault();

  const commentTitle = document.querySelector('#edit-title').value.trim();
  const commentText = document.querySelector('#edit-content').value.trim();
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  if(commentText) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        commentTitle,
        commentText,
        postId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.ok) {
      document.location.reload();
      alert('Post has been updated successfully')
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#save-post-btn').addEventListener('click', editPost);




//DELETING a post
async function deletePost(event) {
  event.preventDefault();

  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });
    if(response.ok) {
      document.location.replace('/dashboard');
      alert('Post has been erased')
    } else {
      alert(response.statusText);
    }
};

document.querySelector('#delete-post-btn').addEventListener('click', deletePost);