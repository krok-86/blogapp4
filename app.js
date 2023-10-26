const express = require('express')

const { sequelize, User, Post } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  const { name } = req.body

  try {
    const user = await User.create({ name })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findOne({
      where: { id },
      include: 'posts',
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findOne({ where: { id } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/users/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  try {
    const user = await User.findOne({ where: { id } })

    user.name = name

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/posts', async (req, res) => {
  const { userId, postText } = req.body

  try {
    console.log(req)
    const user = await User.findOne({ where: { id: userId } })

    const post = await Post.create({ post: postText, userId: user.id })

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json(posts)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen({ port: 3003 }, async () => {
  console.log('Server up on http://localhost:3003')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
