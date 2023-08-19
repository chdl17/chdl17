const fs = require('fs');
const fetch = require('node-fetch');
const parser = require('rss-parser'); // You might need to install this package

const feedUrl = 'https://medium.com/@chadalapakam/feed';
const readmePath = 'README.md';

async function updateReadme() {
  const feedResponse = await fetch(feedUrl);
  const feedText = await feedResponse.text();
  const feed = await parser.parseString(feedText);

  const blogPosts = feed.items.slice(0, 5); // You can customize the number of posts to display

  let newReadmeContent = `# My Blog\n\nLatest Medium Blog Posts:\n\n`;

  blogPosts.forEach((post) => {
    newReadmeContent += `- [${post.title}](${post.link})\n`;
  });

  fs.writeFileSync(readmePath, newReadmeContent);
}

updateReadme().catch(error => {
  console.error('Error updating README:', error);
});
