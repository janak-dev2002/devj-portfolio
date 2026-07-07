package tech.zoneforty5.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.zoneforty5.portfolio.entity.Skill;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    @Query("SELECT DISTINCT s FROM Skill s LEFT JOIN FETCH s.tools ORDER BY s.displayOrder ASC, s.id ASC")
    List<Skill> findAllWithTools();
}
