document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('postList');
  const category = container.dataset.category;

  const response = await fetch('../data/posts.json');
  const allPosts = await response.json();

  const posts = allPosts[category];
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p>おっと、まだ記事がないようです。<br>ごめんね。</p>';
    return;
  }

  const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(post => {
    const section = document.createElement('section');

    const link = document.createElement('a');
    link.href = `../${post.path}`;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = `投稿日: ${post.date}`;

    link.appendChild(h2);
    link.appendChild(p);
    section.appendChild(link);
    container.appendChild(section);
  });
});
