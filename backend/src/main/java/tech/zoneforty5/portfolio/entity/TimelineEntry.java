package tech.zoneforty5.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "timeline_entries")
public class TimelineEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_key", nullable = false, unique = true, length = 50)
    private String entryKey;

    @Column(nullable = false, length = 150)
    private String label;

    @Column(nullable = false, length = 150)
    private String org;

    @Column(name = "date_label", nullable = false, length = 30)
    private String dateLabel;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(nullable = false, length = 300)
    private String note;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    protected TimelineEntry() {
    }

    public String getEntryKey() {
        return entryKey;
    }

    public String getLabel() {
        return label;
    }

    public String getOrg() {
        return org;
    }

    public String getDateLabel() {
        return dateLabel;
    }

    public String getStatus() {
        return status;
    }

    public String getNote() {
        return note;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }
}
