package tech.zoneforty5.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.zoneforty5.portfolio.dto.TimelineDto;
import tech.zoneforty5.portfolio.service.TimelineService;

import java.util.List;

@RestController
@RequestMapping("/api/timeline")
public class TimelineController {

    private final TimelineService timelineService;

    public TimelineController(TimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @GetMapping
    public List<TimelineDto> getTimeline() {
        return timelineService.getAllEntries();
    }
}
