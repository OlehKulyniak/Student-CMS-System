package mainServerPackage;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = {"mainServerPackage", "configuration", "controller", "model", "repository"})
@EnableMongoRepositories("repository")
@EnableJpaRepositories("repository")
@EntityScan("model")
public class StudentCMSServer {
	public static void main(String[] args) {
		SpringApplication.run(StudentCMSServer.class, args);
	}
}
