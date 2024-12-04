"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyTopics = void 0;
const modifyTopics = (topics, rank) => {
    const topicObj = {};
    for (let i = 0; i < topics.length; i++) {
        topicObj[topics[i].id] = i;
    }
    // console.log(topicObj)
    for (let id of rank.topicscompleted) {
        // let modifiedTopic = {} as Topic;
        const filteredTopic = topics[topicObj[id]];
        if (filteredTopic && filteredTopic.id === id) {
            filteredTopic.isCompleted = true;
            topics[topicObj[id]] = filteredTopic;
        }
    }
    return topics;
};
exports.modifyTopics = modifyTopics;
