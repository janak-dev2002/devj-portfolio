package tech.zoneforty5.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.zoneforty5.portfolio.dto.SkillDto;
import tech.zoneforty5.portfolio.entity.Skill;
import tech.zoneforty5.portfolio.entity.SkillTool;
import tech.zoneforty5.portfolio.repository.SkillRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAllWithTools().stream()
                .map(this::toDto)
                .toList();
    }

    private SkillDto toDto(Skill skill) {
        List<String> tools = skill.getTools().stream()
                .map(SkillTool::getTool)
                .toList();
        return new SkillDto(skill.getLabel(), skill.getProficiency(), skill.getColor(), tools);
    }
}
