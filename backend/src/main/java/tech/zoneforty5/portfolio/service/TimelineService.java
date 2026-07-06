package tech.zoneforty5.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.zoneforty5.portfolio.dto.TimelineDto;
import tech.zoneforty5.portfolio.entity.TimelineEntry;
import tech.zoneforty5.portfolio.repository.TimelineEntryRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TimelineService {

    private final TimelineEntryRepository timelineEntryRepository;

    public TimelineService(TimelineEntryRepository timelineEntryRepository) {
        this.timelineEntryRepository = timelineEntryRepository;
    }

    public List<TimelineDto> getAllEntries() {
        return timelineEntryRepository.findAllByOrderByDisplayOrderAscIdAsc().stream()
                .map(this::toDto)
                .toList();
    }

    private TimelineDto toDto(TimelineEntry entry) {
        return new TimelineDto(
                entry.getEntryKey(),
                entry.getLabel(),
                entry.getOrg(),
                entry.getDateLabel(),
                entry.getStatus(),
                entry.getNote()
        );
    }
}
