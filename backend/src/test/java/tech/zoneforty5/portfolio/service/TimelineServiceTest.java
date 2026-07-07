package tech.zoneforty5.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tech.zoneforty5.portfolio.dto.TimelineDto;
import tech.zoneforty5.portfolio.entity.TimelineEntry;
import tech.zoneforty5.portfolio.repository.TimelineEntryRepository;
import tech.zoneforty5.portfolio.support.EntityTestFactory;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TimelineServiceTest {

    @Mock
    private TimelineEntryRepository timelineEntryRepository;

    @InjectMocks
    private TimelineService timelineService;

    @Test
    void mapsEntryKeyToJsonIdAndDateLabelToDate() {
        TimelineEntry entry = EntityTestFactory.timelineEntry(
                "ccna", "Cisco CCNA", "University of Moratuwa — NetAcad", "Jun 2026",
                "active", "Networking fundamentals — TCP/IP, routing, switching, VLANs");
        when(timelineEntryRepository.findAllByOrderByDisplayOrderAscIdAsc()).thenReturn(List.of(entry));

        List<TimelineDto> result = timelineService.getAllEntries();

        assertThat(result).hasSize(1);
        TimelineDto dto = result.get(0);
        assertThat(dto.id()).isEqualTo("ccna");
        assertThat(dto.label()).isEqualTo("Cisco CCNA");
        assertThat(dto.org()).isEqualTo("University of Moratuwa — NetAcad");
        assertThat(dto.date()).isEqualTo("Jun 2026");
        assertThat(dto.status()).isEqualTo("active");
    }
}
