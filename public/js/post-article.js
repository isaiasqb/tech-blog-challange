//FUNCTIONALITY FOR POSTING AN ARTICLE
async function postArticle(event) {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();
  
  if(postTitle && postContent) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.ok) {
      document.location.replace('/');
      alert('Your article has been posted!');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#post-btn').addEventListener('click', postArticle);

//FUNCTIONALITY FOR POSTING AN ARTICLE