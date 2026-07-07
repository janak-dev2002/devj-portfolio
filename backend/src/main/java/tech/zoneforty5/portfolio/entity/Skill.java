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

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String label;

    @Column(nullable = false)
    private Short proficiency;

    @Column(nullable = false, length = 10)
    private String color;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    private List<SkillTool> tools = new ArrayList<>();

    protected Skill() {
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public Short getProficiency() {
        return proficiency;
    }

    public String getColor() {
        return color;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public List<SkillTool> getTools() {
        return tools;
    }
}
