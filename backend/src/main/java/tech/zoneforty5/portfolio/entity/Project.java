package tech.zoneforty5.portfolio.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import tech.zoneforty5.portfolio.dto.ArchEdge;
import tech.zoneforty5.portfolio.dto.ArchNode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String folder;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false, length = 20)
    private String category;

    @Column(name = "github_url", length = 300)
    private String githubUrl;

    @Type(JsonType.class)
    @Column(name = "arch_nodes", nullable = false, columnDefinition = "jsonb")
    private List<ArchNode> archNodes = new ArrayList<>();

    @Type(JsonType.class)
    @Column(name = "arch_edges", nullable = false, columnDefinition = "jsonb")
    private List<ArchEdge> archEdges = new ArrayList<>();

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    private List<ProjectTechStack> techStack = new ArrayList<>();

    protected Project() {
    }

    public Long getId() {
        return id;
    }

    public String getFolder() {
        return folder;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public List<ArchNode> getArchNodes() {
        return archNodes;
    }

    public List<ArchEdge> getArchEdges() {
        return archEdges;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public List<ProjectTechStack> getTechStack() {
        return techStack;
    }
}
