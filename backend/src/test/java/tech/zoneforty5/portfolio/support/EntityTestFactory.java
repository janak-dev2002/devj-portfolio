package tech.zoneforty5.portfolio.support;

import tech.zoneforty5.portfolio.dto.ArchEdge;
import tech.zoneforty5.portfolio.dto.ArchNode;
import tech.zoneforty5.portfolio.entity.Project;
import tech.zoneforty5.portfolio.entity.ProjectTechStack;
import tech.zoneforty5.portfolio.entity.Skill;
import tech.zoneforty5.portfolio.entity.SkillTool;
import tech.zoneforty5.portfolio.entity.TimelineEntry;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * Builds entity instances via reflection for service-layer tests. Entities intentionally expose
 * no setters/public constructors (they are read-only from JPA's perspective at runtime), so tests
 * bypass access modifiers here rather than adding test-only mutability to production code.
 */
public final class EntityTestFactory {

    private EntityTestFactory() {
    }

    public static Project project(String folder, String title, String description, String category,
                                   String githubUrl, List<ArchNode> nodes, List<ArchEdge> edges,
                                   List<String> stack) {
        Project project = newInstance(Project.class);
        setField(project, "folder", folder);
        setField(project, "title", title);
        setField(project, "description", description);
        setField(project, "category", category);
        setField(project, "githubUrl", githubUrl);
        setField(project, "archNodes", new ArrayList<>(nodes));
        setField(project, "archEdges", new ArrayList<>(edges));

        List<ProjectTechStack> techStack = new ArrayList<>();
        int order = 1;
        for (String tech : stack) {
            ProjectTechStack entry = newInstance(ProjectTechStack.class);
            setField(entry, "tech", tech);
            setField(entry, "displayOrder", order++);
            techStack.add(entry);
        }
        setField(project, "techStack", techStack);
        return project;
    }

    public static Skill skill(String label, int proficiency, String color, List<String> tools) {
        Skill skill = newInstance(Skill.class);
        setField(skill, "label", label);
        setField(skill, "proficiency", (short) proficiency);
        setField(skill, "color", color);

        List<SkillTool> skillTools = new ArrayList<>();
        int order = 1;
        for (String tool : tools) {
            SkillTool entry = newInstance(SkillTool.class);
            setField(entry, "tool", tool);
            setField(entry, "displayOrder", order++);
            skillTools.add(entry);
        }
        setField(skill, "tools", skillTools);
        return skill;
    }

    public static TimelineEntry timelineEntry(String entryKey, String label, String org, String dateLabel,
                                               String status, String note) {
        TimelineEntry entry = newInstance(TimelineEntry.class);
        setField(entry, "entryKey", entryKey);
        setField(entry, "label", label);
        setField(entry, "org", org);
        setField(entry, "dateLabel", dateLabel);
        setField(entry, "status", status);
        setField(entry, "note", note);
        return entry;
    }

    private static <T> T newInstance(Class<T> type) {
        try {
            var constructor = type.getDeclaredConstructor();
            constructor.setAccessible(true);
            return constructor.newInstance();
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Failed to instantiate " + type, e);
        }
    }

    private static void setField(Object target, String fieldName, Object value) {
        try {
            Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Failed to set field " + fieldName + " on " + target.getClass(), e);
        }
    }
}
