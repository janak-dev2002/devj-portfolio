-- =========================================================
-- V1__schema.sql  (versioned, immutable once released)
-- Source of truth: shared/api-contracts.md §3.1
-- DO NOT EDIT after this migration has been applied to any
-- environment -- editing an applied V__ file breaks the
-- Flyway checksum and crashes startup (see R-4 in architecture.md).
-- Ship schema changes as new V2__*.sql files instead.
-- =========================================================

-- ---------- projects ----------
CREATE TABLE projects (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    folder        VARCHAR(100)  NOT NULL UNIQUE,
    title         VARCHAR(200)  NOT NULL,
    description   TEXT          NOT NULL,
    category      VARCHAR(20)   NOT NULL,
    github_url    VARCHAR(300),
    arch_nodes    JSONB         NOT NULL DEFAULT '[]'::jsonb,
    arch_edges    JSONB         NOT NULL DEFAULT '[]'::jsonb,
    display_order INTEGER       NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT chk_projects_category
        CHECK (category IN ('infrastructure','software-iot','coming-soon'))
);
CREATE INDEX idx_projects_order ON projects (display_order, id);

-- ---------- project_tech_stack (stack[] per project) ----------
CREATE TABLE project_tech_stack (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id    BIGINT        NOT NULL
                  REFERENCES projects (id) ON DELETE CASCADE,
    tech          VARCHAR(100)  NOT NULL,
    display_order INTEGER       NOT NULL DEFAULT 0,
    CONSTRAINT uq_project_tech UNIQUE (project_id, tech)
);
CREATE INDEX idx_pts_project ON project_tech_stack (project_id, display_order);

-- ---------- skills (hex skills, flat list) ----------
CREATE TABLE skills (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label         VARCHAR(100)  NOT NULL UNIQUE,
    proficiency   SMALLINT      NOT NULL,
    color         VARCHAR(10)   NOT NULL,
    display_order INTEGER       NOT NULL DEFAULT 0,
    CONSTRAINT chk_skill_proficiency CHECK (proficiency BETWEEN 0 AND 100),
    CONSTRAINT chk_skill_color       CHECK (color IN ('green','blue'))
);
CREATE INDEX idx_skills_order ON skills (display_order, id);

-- ---------- skill_tools (tools[] per skill) ----------
CREATE TABLE skill_tools (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id      BIGINT        NOT NULL
                  REFERENCES skills (id) ON DELETE CASCADE,
    tool          VARCHAR(100)  NOT NULL,
    display_order INTEGER       NOT NULL DEFAULT 0,
    CONSTRAINT uq_skill_tool UNIQUE (skill_id, tool)
);
CREATE INDEX idx_skill_tools_skill ON skill_tools (skill_id, display_order);

-- ---------- timeline_entries (certifications / roadmap) ----------
CREATE TABLE timeline_entries (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entry_key     VARCHAR(50)   NOT NULL UNIQUE,
    label         VARCHAR(150)  NOT NULL,
    org           VARCHAR(150)  NOT NULL,
    date_label    VARCHAR(30)   NOT NULL,
    status        VARCHAR(20)   NOT NULL,
    note          VARCHAR(300)  NOT NULL,
    display_order INTEGER       NOT NULL DEFAULT 0,
    CONSTRAINT chk_timeline_status CHECK (status IN ('active','queued'))
);
CREATE INDEX idx_timeline_order ON timeline_entries (display_order, id);
