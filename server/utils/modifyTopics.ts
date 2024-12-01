type Topic = {
    id: number;
    title: string;
    video: string;
    description: string;
    isCompleted: boolean
}
type Rank = {
    id: number;
    completed: boolean;
    topicscompleted: number[];
    rate: number;
    userId: number;
    subjectId: number

}
type Obj = {
    [key: string]: number
}

export const modifyTopics = (topics: Topic[], rank: Rank) => {

    const topicObj = {} as Obj;
    for (let i = 0; i < topics.length; i++) {
        topicObj[topics[i].id] = i
    }
    // console.log(topicObj)
    for (let id of rank.topicscompleted) {
        // let modifiedTopic = {} as Topic;
        const filteredTopic = topics[topicObj[id]]
        if (filteredTopic && filteredTopic.id === id) {

            filteredTopic.isCompleted = true;

            topics[topicObj[id]] = filteredTopic

        }
    }

    return topics
}