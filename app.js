const express = require('express')

const { sequelize, User, Post, Topic} = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  const { name } = req.body

  try {
    const user = await User.create({ name })

    return res.json(user)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(">>>>>>",err)
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
    console.log(">>>>>>",err)
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
    console.log(">>>>>>",err)
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
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/posts', async (req, res) => {
  const { userId, topicId, postText } = req.body

  try {
    console.log(req)
    const user = await User.findOne({ where: { id: userId } })
    const topic = await Topic.findOne({where: { id: topicId }})
    const post = await Post.create({ post: postText, userId: user.id, topicId: topic.id })

    return res.json(post)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json(err)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ['user','topic']})
    console.log(">>>>>>",posts)
    return res.json(posts)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json(err)
  }
})

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findOne({
      where: { id }
    })
    return res.json(post)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
    const post = await User.findOne({ where: { id } })

    await post.destroy()

    return res.json({ message: 'Post deleted!' })
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/posts/:id', async (req, res) => {
  const id = req.params.id
  const { post } = req.body
  try {
    const postText = await Post.findOne({ where: { id } })

    postText.post = post

    await postText.save()

    return res.json(postText)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/topics', async (req, res) => {
  const { title } = req.body

  try {
    const topic = await Topic.create({ title })

    return res.json(topic)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json(err)
  }
})

app.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.findAll()

    return res.json(topics)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/topics/:id', async (req, res) => {
  const id = req.params.id
  try {
    const topic = await Topic.findOne({
      where: { id },
      include: 'posts',
    })

    return res.json(topic)
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/topics/:id', async (req, res) => {
  const id = req.params.id
  try {
    const topic = await Topic.findOne({ where: { id } })

    await topic.destroy()

    return res.json({ message: 'Topic deleted!' })
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/topics/:id', async (req,res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const topic = await Topic.findOne({ where: { id } })
    topic.title = title
    await topic.save()
    return res.json(topic)//Topic update 
  } catch (err) {
    console.log(">>>>>>",err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen({ port: 3000 }, async () => {
  console.log('Server up on http://localhost:3000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
