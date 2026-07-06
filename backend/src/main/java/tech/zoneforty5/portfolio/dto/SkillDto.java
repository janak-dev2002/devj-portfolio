package tech.zoneforty5.portfolio.dto;

import java.util.List;

public record SkillDto(
        String label,
        int proficiency,
        String color,
        List<String> tools
) {
}
