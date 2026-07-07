package tech.zoneforty5.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.zoneforty5.portfolio.entity.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN FETCH p.techStack ORDER BY p.displayOrder ASC, p.id ASC")
    List<Project> findAllWithTechStack();
}
