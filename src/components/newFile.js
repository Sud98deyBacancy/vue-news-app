export default (await import('vue')).default.extend({
name: 'NewsItem',
props: ['imageURL', 'newsURL', 'title', 'source', 'description', 'author', 'time']
});
