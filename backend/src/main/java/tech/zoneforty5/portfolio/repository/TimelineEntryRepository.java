package tech.zoneforty5.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.zoneforty5.portfolio.entity.TimelineEntry;

import java.util.List;

public interface TimelineEntryRepository extends JpaRepository<TimelineEntry, Long> {

    List<TimelineEntry> findAllByOrderByDisplayOrderAscIdAsc();
}
