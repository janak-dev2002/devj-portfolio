package tech.zoneforty5.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

public record ArchEdge(String from, String to, @JsonInclude(JsonInclude.Include.NON_NULL) String label) {
}
