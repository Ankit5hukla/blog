const render = () => {
  import(`src/assets/scss/blogs.scss`).then(() => {
    require('src/AppRenderer')
  })
}
render()
