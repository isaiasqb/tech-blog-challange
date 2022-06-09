async function likePost(event) {
  event.preventDefault();
  
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
  ];

  const response = await fetch('/api/posts/like', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: postId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(response.ok) {
    document.location.reload();
  } else {
    alert(`${response.statusText}: You Already Liked this post!`);
  }
  
  console.log(postId);
};

document.querySelector('#like-btn').addEventListener('click', likePost);


async function commentOnPost(event) {
  event.preventDefault();

  console.log('addinc a comment');
};

document.querySelector('#comment-btn').addEventListener('click', commentOnPost);