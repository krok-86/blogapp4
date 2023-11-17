const Router = require('express');
const router = new Router();
const topicController = require('../controller/topic.controller');

//create user(author)
router.post('/', topicController.createTopic);
router.get('/', topicController.getTopics);
router.get('/:id', topicController.getOneTopic);
router.delete('/:id', topicController.deleteTopic);
router.put('/', topicController.updateTopicAndAddToPost);
router.put('/:id', topicController.updateTopic);

module.exports = router;