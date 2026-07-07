-- =========================================================
-- R__seed_content.sql  (repeatable, idempotent upserts)
-- Source of truth: frontend/src/data/content.ts (verbatim, Q-2)
-- Re-applies automatically whenever this file's checksum changes.
-- Safe to edit and push -- do NOT touch V__ files instead (R-4).
-- =========================================================

-- ---------- projects + project_tech_stack ----------

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('batcavelab', 'batcavelab Homelab', 'Ubuntu Server 24.04 homelab running LXD with a 3-container mini-VPC — web, db, and router. Network segmentation, SSH ED25519 auth, systemd service management.', 'infrastructure', NULL, '[{"id":"dev","label":"Dev Machine","x":30,"y":50,"type":"device"},{"id":"host","label":"LXD Host","x":110,"y":50,"type":"box"},{"id":"web","label":"web:Nginx","x":210,"y":15,"type":"box"},{"id":"db","label":"db:Postgres","x":210,"y":50,"type":"box"},{"id":"router","label":"router","x":210,"y":85,"type":"box"}]'::jsonb, '[{"from":"dev","to":"host"},{"from":"host","to":"web"},{"from":"host","to":"db"},{"from":"host","to":"router"}]'::jsonb, 1)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'batcavelab');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'batcavelab'), 'Ubuntu 24.04', 1),
    ((SELECT id FROM projects WHERE folder = 'batcavelab'), 'LXD', 2),
    ((SELECT id FROM projects WHERE folder = 'batcavelab'), 'Nginx', 3),
    ((SELECT id FROM projects WHERE folder = 'batcavelab'), 'PostgreSQL', 4),
    ((SELECT id FROM projects WHERE folder = 'batcavelab'), 'SSH', 5);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('zoneforty5-cloud', 'ZoneForty5 Cloud Infra', 'AWS production environment — EC2, Docker Compose, CloudFront CDN, Route 53 DNS, ACM TLS. Automated deploy pipeline via GitHub Actions.', 'infrastructure', NULL, '[{"id":"gh","label":"GitHub","x":30,"y":50,"type":"device"},{"id":"ci","label":"GH Actions","x":110,"y":50,"type":"box"},{"id":"ec2","label":"EC2+Docker","x":180,"y":50,"type":"box"},{"id":"cf","label":"CloudFront","x":260,"y":20,"type":"cloud"},{"id":"r53","label":"Route 53","x":260,"y":80,"type":"cloud"}]'::jsonb, '[{"from":"gh","to":"ci","label":"push"},{"from":"ci","to":"ec2","label":"deploy"},{"from":"ec2","to":"cf"},{"from":"ec2","to":"r53"}]'::jsonb, 2)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'zoneforty5-cloud');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'zoneforty5-cloud'), 'AWS EC2', 1),
    ((SELECT id FROM projects WHERE folder = 'zoneforty5-cloud'), 'Docker Compose', 2),
    ((SELECT id FROM projects WHERE folder = 'zoneforty5-cloud'), 'CloudFront', 3),
    ((SELECT id FROM projects WHERE folder = 'zoneforty5-cloud'), 'Route 53', 4),
    ((SELECT id FROM projects WHERE folder = 'zoneforty5-cloud'), 'GitHub Actions', 5);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('raspi-edge-monitoring', 'Raspberry Pi Edge Monitoring', '60+ node distributed edge infrastructure — Go agents on each Pi, MQTT broker, real-time telemetry aggregation, Grafana dashboards for fleet visibility.', 'software-iot', NULL, '[{"id":"fleet","label":"60x RPi","x":30,"y":50,"type":"device"},{"id":"broker","label":"MQTT Broker","x":120,"y":50,"type":"box"},{"id":"agg","label":"Aggregator","x":200,"y":50,"type":"box"},{"id":"dash","label":"Grafana","x":270,"y":50,"type":"cloud"}]'::jsonb, '[{"from":"fleet","to":"broker","label":"MQTT"},{"from":"broker","to":"agg"},{"from":"agg","to":"dash","label":"HTTP"}]'::jsonb, 3)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring'), 'Raspberry Pi', 1),
    ((SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring'), 'Go', 2),
    ((SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring'), 'MQTT', 3),
    ((SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring'), 'Mosquitto', 4),
    ((SELECT id FROM projects WHERE folder = 'raspi-edge-monitoring'), 'Grafana', 5);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('hermes-agent', 'Hermes Agent Architecture', 'Telegram-controlled multi-LLM agent system with Claude Opus/Sonnet/Haiku role layers. Custom MCP servers bridge agents to physical hardware and external APIs.', 'software-iot', NULL, '[{"id":"tg","label":"Telegram","x":30,"y":50,"type":"device"},{"id":"hermes","label":"Hermes","x":115,"y":50,"type":"box"},{"id":"claude","label":"Claude API","x":210,"y":20,"type":"cloud"},{"id":"mcp","label":"MCP Servers","x":210,"y":80,"type":"box"},{"id":"hw","label":"Hardware","x":270,"y":80,"type":"device"}]'::jsonb, '[{"from":"tg","to":"hermes"},{"from":"hermes","to":"claude"},{"from":"hermes","to":"mcp"},{"from":"mcp","to":"hw"}]'::jsonb, 4)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'hermes-agent');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'hermes-agent'), 'Claude API', 1),
    ((SELECT id FROM projects WHERE folder = 'hermes-agent'), 'MCP', 2),
    ((SELECT id FROM projects WHERE folder = 'hermes-agent'), 'Go', 3),
    ((SELECT id FROM projects WHERE folder = 'hermes-agent'), 'Telegram Bot API', 4),
    ((SELECT id FROM projects WHERE folder = 'hermes-agent'), 'Python', 5);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('gym-platform', 'Gym Management Platform', '13-service polyglot distributed system — Java Spring Boot core services, Go microservices for real-time operations, PostgreSQL, Redis, and RabbitMQ.', 'software-iot', NULL, '[{"id":"client","label":"Client","x":30,"y":50,"type":"device"},{"id":"gw","label":"API Gateway","x":110,"y":50,"type":"box"},{"id":"java","label":"Java (8 svc)","x":195,"y":20,"type":"box"},{"id":"go","label":"Go (5 svc)","x":195,"y":80,"type":"box"},{"id":"db","label":"PG+RMQ","x":265,"y":50,"type":"box"}]'::jsonb, '[{"from":"client","to":"gw"},{"from":"gw","to":"java"},{"from":"gw","to":"go"},{"from":"java","to":"db"},{"from":"go","to":"db"}]'::jsonb, 5)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'gym-platform');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'Java', 1),
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'Spring Boot', 2),
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'Go', 3),
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'PostgreSQL', 4),
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'Redis', 5),
    ((SELECT id FROM projects WHERE folder = 'gym-platform'), 'RabbitMQ', 6);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('devj-hikconnect', 'devj-hikconnect SDK', 'Commercial Java SDK for Hikvision ISAPI — biometric access control integration, ISAPI arming, offline event backfill via AcsEvent polling. Published on Maven Central.', 'software-iot', NULL, '[{"id":"app","label":"Java App","x":30,"y":50,"type":"device"},{"id":"sdk","label":"SDK Layer","x":120,"y":50,"type":"box"},{"id":"isapi","label":"ISAPI","x":210,"y":50,"type":"box"},{"id":"dev","label":"HikDevice","x":270,"y":50,"type":"device"}]'::jsonb, '[{"from":"app","to":"sdk","label":"Maven"},{"from":"sdk","to":"isapi","label":"HTTP"},{"from":"isapi","to":"dev"}]'::jsonb, 6)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'devj-hikconnect');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'devj-hikconnect'), 'Java', 1),
    ((SELECT id FROM projects WHERE folder = 'devj-hikconnect'), 'Hikvision ISAPI', 2),
    ((SELECT id FROM projects WHERE folder = 'devj-hikconnect'), 'Maven', 3),
    ((SELECT id FROM projects WHERE folder = 'devj-hikconnect'), 'REST', 4);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('ci-cd-pipeline', 'CI/CD Pipeline', 'GitHub Actions build, test, and deploy pipeline with Docker.', 'coming-soon', NULL, '[]'::jsonb, '[]'::jsonb, 7)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'ci-cd-pipeline');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'ci-cd-pipeline'), 'GitHub Actions', 1),
    ((SELECT id FROM projects WHERE folder = 'ci-cd-pipeline'), 'Docker', 2);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('terraform-aws-infra', 'Terraform AWS Infra', 'VPC, EC2, S3 provisioned entirely as Infrastructure as Code.', 'coming-soon', NULL, '[]'::jsonb, '[]'::jsonb, 8)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'terraform-aws-infra');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'terraform-aws-infra'), 'Terraform', 1),
    ((SELECT id FROM projects WHERE folder = 'terraform-aws-infra'), 'AWS', 2);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('kubernetes-cluster', 'Kubernetes Cluster', 'K8s deployment with Helm charts and Ingress controller.', 'coming-soon', NULL, '[]'::jsonb, '[]'::jsonb, 9)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'kubernetes-cluster');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'kubernetes-cluster'), 'Kubernetes', 1),
    ((SELECT id FROM projects WHERE folder = 'kubernetes-cluster'), 'Helm', 2);

INSERT INTO projects (folder, title, description, category, github_url, arch_nodes, arch_edges, display_order)
VALUES ('monitoring-stack', 'Monitoring Stack', 'Prometheus + Grafana dashboards, alerting, Loki log aggregation.', 'coming-soon', NULL, '[]'::jsonb, '[]'::jsonb, 10)
ON CONFLICT (folder) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    github_url = EXCLUDED.github_url,
    arch_nodes = EXCLUDED.arch_nodes,
    arch_edges = EXCLUDED.arch_edges,
    display_order = EXCLUDED.display_order,
    updated_at = now();

DELETE FROM project_tech_stack WHERE project_id = (SELECT id FROM projects WHERE folder = 'monitoring-stack');
INSERT INTO project_tech_stack (project_id, tech, display_order) VALUES
    ((SELECT id FROM projects WHERE folder = 'monitoring-stack'), 'Prometheus', 1),
    ((SELECT id FROM projects WHERE folder = 'monitoring-stack'), 'Grafana', 2),
    ((SELECT id FROM projects WHERE folder = 'monitoring-stack'), 'Loki', 3);

-- ---------- skills + skill_tools ----------

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Linux', 82, 'green', 1)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Linux');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Linux'), 'Ubuntu', 1),
    ((SELECT id FROM skills WHERE label = 'Linux'), 'RHEL', 2),
    ((SELECT id FROM skills WHERE label = 'Linux'), 'Systemd', 3),
    ((SELECT id FROM skills WHERE label = 'Linux'), 'SSH', 4),
    ((SELECT id FROM skills WHERE label = 'Linux'), 'Bash', 5);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Containers', 80, 'green', 2)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Containers');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Containers'), 'Docker', 1),
    ((SELECT id FROM skills WHERE label = 'Containers'), 'Docker Compose', 2),
    ((SELECT id FROM skills WHERE label = 'Containers'), 'Kubernetes', 3),
    ((SELECT id FROM skills WHERE label = 'Containers'), 'Helm', 4);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('CI/CD', 78, 'green', 3)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'CI/CD');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'CI/CD'), 'GitHub Actions', 1),
    ((SELECT id FROM skills WHERE label = 'CI/CD'), 'Git', 2),
    ((SELECT id FROM skills WHERE label = 'CI/CD'), 'Branching', 3),
    ((SELECT id FROM skills WHERE label = 'CI/CD'), 'PRs', 4);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('AWS Cloud', 75, 'green', 4)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'AWS Cloud');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'AWS Cloud'), 'EC2', 1),
    ((SELECT id FROM skills WHERE label = 'AWS Cloud'), 'S3', 2),
    ((SELECT id FROM skills WHERE label = 'AWS Cloud'), 'IAM', 3),
    ((SELECT id FROM skills WHERE label = 'AWS Cloud'), 'CloudFront', 4),
    ((SELECT id FROM skills WHERE label = 'AWS Cloud'), 'Lambda', 5);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Networking', 65, 'blue', 5)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Networking');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Networking'), 'TCP/IP', 1),
    ((SELECT id FROM skills WHERE label = 'Networking'), 'DNS', 2),
    ((SELECT id FROM skills WHERE label = 'Networking'), 'DHCP', 3),
    ((SELECT id FROM skills WHERE label = 'Networking'), 'VLANs', 4),
    ((SELECT id FROM skills WHERE label = 'Networking'), 'CCNA', 5);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Terraform', 50, 'blue', 6)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Terraform');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Terraform'), 'Providers', 1),
    ((SELECT id FROM skills WHERE label = 'Terraform'), 'Modules', 2),
    ((SELECT id FROM skills WHERE label = 'Terraform'), 'State', 3);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Ansible', 48, 'blue', 7)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Ansible');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Ansible'), 'Playbooks', 1),
    ((SELECT id FROM skills WHERE label = 'Ansible'), 'Inventory', 2),
    ((SELECT id FROM skills WHERE label = 'Ansible'), 'Roles', 3);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Monitoring', 45, 'blue', 8)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Monitoring');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Monitoring'), 'Prometheus', 1),
    ((SELECT id FROM skills WHERE label = 'Monitoring'), 'Grafana', 2),
    ((SELECT id FROM skills WHERE label = 'Monitoring'), 'Loki', 3);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('IoT / Edge', 88, 'green', 9)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'IoT / Edge');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'IoT / Edge'), 'MQTT', 1),
    ((SELECT id FROM skills WHERE label = 'IoT / Edge'), 'Raspberry Pi', 2),
    ((SELECT id FROM skills WHERE label = 'IoT / Edge'), 'Edge Agents', 3),
    ((SELECT id FROM skills WHERE label = 'IoT / Edge'), 'Go', 4);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Backend', 85, 'green', 10)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Backend');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Backend'), 'Go', 1),
    ((SELECT id FROM skills WHERE label = 'Backend'), 'Java Spring Boot', 2),
    ((SELECT id FROM skills WHERE label = 'Backend'), 'Python', 3),
    ((SELECT id FROM skills WHERE label = 'Backend'), 'Node.js', 4);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('Scripting', 80, 'green', 11)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'Scripting');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'Scripting'), 'Bash', 1),
    ((SELECT id FROM skills WHERE label = 'Scripting'), 'Python', 2),
    ((SELECT id FROM skills WHERE label = 'Scripting'), 'PowerShell', 3);

INSERT INTO skills (label, proficiency, color, display_order)
VALUES ('MCP / AI', 72, 'green', 12)
ON CONFLICT (label) DO UPDATE SET
    proficiency = EXCLUDED.proficiency,
    color = EXCLUDED.color,
    display_order = EXCLUDED.display_order;

DELETE FROM skill_tools WHERE skill_id = (SELECT id FROM skills WHERE label = 'MCP / AI');
INSERT INTO skill_tools (skill_id, tool, display_order) VALUES
    ((SELECT id FROM skills WHERE label = 'MCP / AI'), 'Claude API', 1),
    ((SELECT id FROM skills WHERE label = 'MCP / AI'), 'MCP Servers', 2),
    ((SELECT id FROM skills WHERE label = 'MCP / AI'), 'Agent Design', 3);

-- ---------- timeline_entries ----------

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('ccna', 'Cisco CCNA', 'University of Moratuwa — NetAcad', 'Jun 2026', 'active', 'Networking fundamentals — TCP/IP, routing, switching, VLANs', 1)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('rhcsa', 'Red Hat RHCSA', 'Red Hat', 'Q4 2026', 'queued', 'Linux system administration at enterprise level', 2)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('aws-saa', 'AWS Solutions Architect Associate', 'Amazon Web Services', 'Q1 2027', 'queued', 'Cloud architecture, services, and best practices', 3)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('terraform', 'HashiCorp Terraform Associate', 'HashiCorp', 'Q1 2027', 'queued', 'Infrastructure as Code at scale', 4)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('cka', 'Certified Kubernetes Administrator', 'CNCF', 'Q2 2027', 'queued', 'Production Kubernetes operations and administration', 5)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;

INSERT INTO timeline_entries (entry_key, label, org, date_label, status, note, display_order)
VALUES ('aws-devops', 'AWS DevOps Professional', 'Amazon Web Services', 'Q3 2027', 'queued', 'DevOps practices on AWS at professional level', 6)
ON CONFLICT (entry_key) DO UPDATE SET
    label = EXCLUDED.label,
    org = EXCLUDED.org,
    date_label = EXCLUDED.date_label,
    status = EXCLUDED.status,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order;
