import * as DataLoader from "dataloader";
import { PostingTopic } from "../entity/PostingTopic";
import { In } from "typeorm";
import { Tag } from "../entity/Tag";

const batchTags = async (postingIds: string[]) => {
  const postingTopics = await PostingTopic.find({
    join: {
      alias: "postingTopic",
      innerJoinAndSelect: {
        topic: "postingTopic.topic"
      }
    },
    where: {
      postingId: In(postingIds)
    }
  });

  const postingIdToTopics: { [key: string]: Tag[] } = {};

  /*
  posting topics object: 
  {
    postingId: 1,
    topicId: 1,
    __posting__: { id: 1, name: 'posting1' }
  }
*/

  postingTopics.forEach(pt => {
    if (pt.postingId in postingIdToTopics) {
      postingIdToTopics[pt.postingId].push((pt as any).__topic__);
    } else {
      postingIdToTopics[pt.postingId] = [(pt as any).__topic__];
    }
  });

  return postingIds.map(postingId => postingIdToTopics[postingId]);
};

export const topicPostingLoader = () => new DataLoader(batchTags);
