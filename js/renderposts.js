document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('postList');
  const category = container.dataset.category;

  const response = await fetch('../data/posts.json');
  const allPosts = await response.json();

  const posts = allPosts[category];
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p>記事がありません。</p>';
    return;
  }

  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const list = document.createElement('ul');
  sorted.forEach(post => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `../${post.path}`;
    a.textContent = `${post.date} - ${post.title}`;
    li.appendChild(a);
    list.appendChild(li);
  });

  container.appendChild(list);
});

