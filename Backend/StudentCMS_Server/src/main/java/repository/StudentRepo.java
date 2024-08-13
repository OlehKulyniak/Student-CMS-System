package repository;

import model.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
    boolean existsByFirstNameAndLastName(String firstName, String lastName);

}
