.PHONY: up down logs deploy provision dev-up dev-down dev-logs build ps

# ---- production-shaped stack (db + backend + nginx + cloudflared) ----

up:
	docker compose up --build --detach

down:
	docker compose down

logs:
	docker compose logs -f --tail=200

ps:
	docker compose ps

build:
	docker compose build

# Re-run from a machine with SSH access to the home server (see
# devops/ansible/inventory.ini and .env on the server for what's assumed).
deploy:
	ssh "$(HOME_SERVER_USER)@$(HOME_SERVER_HOST)" \
		"cd /opt/devj-portfolio && docker compose pull && docker compose up --detach --remove-orphans"

# One-time (or drift-reconciling) server provisioning. NOT run automatically —
# see shared/agent-handoffs/devops-done.md before pointing this at a real host.
provision:
	cd devops/ansible && ansible-playbook provision.yml --ask-vault-pass

# ---- local dev stack (db + backend only, no nginx/cloudflared) ----

dev-up:
	docker compose -f docker-compose.dev.yml up --build --detach

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f --tail=200
