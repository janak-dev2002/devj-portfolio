package tech.zoneforty5.portfolio.dto;

import java.util.List;

public record ProjectDto(
        String folder,
        String title,
        String description,
        List<String> stack,
        String githubUrl,
        String category,
        List<ArchNode> nodes,
        List<ArchEdge> edges
) {
}
