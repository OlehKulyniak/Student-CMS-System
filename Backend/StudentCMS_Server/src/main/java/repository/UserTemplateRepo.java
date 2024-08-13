package repository;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Update;
import com.mongodb.client.result.UpdateResult;

@Service
public class UserTemplateRepo {

    public UpdateResult addNewChatRoom(String user_id, String chatRoom_id) {
        MongoTemplate mongoTemplate;
        try(MongoClient mongoClient =
                    MongoClients.create("mongodb+srv://kulinakoleg:Geijr12345@cmscluster.zdcoqzz.mongodb.net")) {
            mongoTemplate = new MongoTemplate(mongoClient, "studentcms");
            mongoClient.startSession();
            Update update = new Update();
            update.addToSet("chatRooms", chatRoom_id);
            Criteria criteria = Criteria.where("_id").is(user_id);
            UpdateResult updateResult =  mongoTemplate.updateFirst(Query.query(criteria), update, "user");
            mongoClient.close();
            return updateResult;
        }
        catch(Exception error) {
            error.printStackTrace();
        }
        return null;
    }
}
