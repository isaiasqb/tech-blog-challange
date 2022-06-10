//FUNCTIONALITY FOR COMMENTS
async function commentOnPost(event) {
  event.preventDefault();

  const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  if(commentText) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        commentText,
        postId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#comment-btn').addEventListener('click', commentOnPost);