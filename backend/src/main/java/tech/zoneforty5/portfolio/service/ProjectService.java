package tech.zoneforty5.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.zoneforty5.portfolio.dto.ProjectDto;
import tech.zoneforty5.portfolio.entity.Project;
import tech.zoneforty5.portfolio.entity.ProjectTechStack;
import tech.zoneforty5.portfolio.repository.ProjectRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllWithTechStack().stream()
                .map(this::toDto)
                .toList();
    }

    private ProjectDto toDto(Project project) {
        List<String> stack = project.getTechStack().stream()
                .map(ProjectTechStack::getTech)
                .toList();
        return new ProjectDto(
                project.getFolder(),
                project.getTitle(),
                project.getDescription(),
                stack,
                project.getGithubUrl(),
                project.getCategory(),
                project.getArchNodes(),
                project.getArchEdges()
        );
    }
}
