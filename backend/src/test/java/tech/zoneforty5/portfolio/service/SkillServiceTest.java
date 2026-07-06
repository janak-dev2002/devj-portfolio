package tech.zoneforty5.portfolio.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tech.zoneforty5.portfolio.dto.SkillDto;
import tech.zoneforty5.portfolio.entity.Skill;
import tech.zoneforty5.portfolio.repository.SkillRepository;
import tech.zoneforty5.portfolio.support.EntityTestFactory;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SkillServiceTest {

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private SkillService skillService;

    @Test
    void mapsSkillFieldsAndOrderedTools() {
        Skill skill = EntityTestFactory.skill("Linux", 82, "green",
                List.of("Ubuntu", "RHEL", "Systemd", "SSH", "Bash"));
        when(skillRepository.findAllWithTools()).thenReturn(List.of(skill));

        List<SkillDto> result = skillService.getAllSkills();

        assertThat(result).hasSize(1);
        SkillDto dto = result.get(0);
        assertThat(dto.label()).isEqualTo("Linux");
        assertThat(dto.proficiency()).isEqualTo(82);
        assertThat(dto.color()).isEqualTo("green");
        assertThat(dto.tools()).containsExactly("Ubuntu", "RHEL", "Systemd", "SSH", "Bash");
    }
}
