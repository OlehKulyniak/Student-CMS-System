package model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@Document
public class Task {

    @Id
    private String id;
    private TaskBoard board;
    private String title;
    private LocalDate endDate;
    private String description;
    private String user_id;

}
