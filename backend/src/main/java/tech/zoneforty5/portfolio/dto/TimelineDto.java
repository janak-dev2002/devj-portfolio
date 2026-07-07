package tech.zoneforty5.portfolio.dto;

public record TimelineDto(
        String id,
        String label,
        String org,
        String date,
        String status,
        String note
) {
}
