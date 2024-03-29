const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const copy = [...blogs]
  copy.sort((a, b) => b.likes - a.likes)
  return copy.length > 0 ? copy[0] : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
