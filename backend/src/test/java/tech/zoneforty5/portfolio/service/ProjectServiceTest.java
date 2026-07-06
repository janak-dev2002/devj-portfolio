package tech.zoneforty5.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tech.zoneforty5.portfolio.dto.ArchEdge;
import tech.zoneforty5.portfolio.dto.ArchNode;
import tech.zoneforty5.portfolio.dto.ProjectDto;
import tech.zoneforty5.portfolio.entity.Project;
import tech.zoneforty5.portfolio.repository.ProjectRepository;
import tech.zoneforty5.portfolio.support.EntityTestFactory;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void mapsProjectFieldsAndOrderedTechStackVerbatim() {
        List<ArchNode> nodes = List.of(new ArchNode("dev", "Dev Machine", 30, 50, "device"));
        List<ArchEdge> edges = List.of(new ArchEdge("dev", "host", null));
        Project project = EntityTestFactory.project(
                "batcavelab", "batcavelab Homelab", "desc", "infrastructure", null,
                nodes, edges, List.of("Ubuntu 24.04", "LXD", "Nginx"));
        when(projectRepository.findAllWithTechStack()).thenReturn(List.of(project));

        List<ProjectDto> result = projectService.getAllProjects();

        assertThat(result).hasSize(1);
        ProjectDto dto = result.get(0);
        assertThat(dto.folder()).isEqualTo("batcavelab");
        assertThat(dto.title()).isEqualTo("batcavelab Homelab");
        assertThat(dto.category()).isEqualTo("infrastructure");
        assertThat(dto.githubUrl()).isNull();
        assertThat(dto.stack()).containsExactly("Ubuntu 24.04", "LXD", "Nginx");
        assertThat(dto.nodes()).isEqualTo(nodes);
        assertThat(dto.edges()).isEqualTo(edges);
        verify(projectRepository).findAllWithTechStack();
    }

    @Test
    void comingSoonProjectHasEmptyNodesAndEdges() {
        Project project = EntityTestFactory.project(
                "ci-cd-pipeline", "CI/CD Pipeline", "desc", "coming-soon", null,
                List.of(), List.of(), List.of("GitHub Actions", "Docker"));
        when(projectRepository.findAllWithTechStack()).thenReturn(List.of(project));

        ProjectDto dto = projectService.getAllProjects().get(0);

        assertThat(dto.nodes()).isEmpty();
        assertThat(dto.edges()).isEmpty();
    }
}
