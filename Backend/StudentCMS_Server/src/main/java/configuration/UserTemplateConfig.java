package configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class UserTemplateConfig {

    @Value("${spring.data.mongodb.uri}")
    private String mongoDBURI;

    @Bean
    MongoClient mongoClient() {
        return MongoClients.create(mongoDBURI);
    }

    @Bean
    MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "studentcms");
    }
}
