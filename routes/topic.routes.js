const Router = require('express');
const router = new Router();
const topicController = require('../controller/topic.controller');

//create user(author)
router.post('/topics', topicController.createTopic);
router.get('/topics', topicController.getTopics);
router.get('/topics/:id', topicController.getOneTopic);
router.delete('/topics/:id', topicController.deleteTopic);
router.put('/topics', topicController.updateTopicAndAddToPost);
router.put('/topics/:id', topicController.updateTopic);

module.exports = router;