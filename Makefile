.PHONY: up down logs deploy deploy-proxy-conf provision dev-up dev-down dev-logs build ps

# ---- production-shaped stack (db + devj-backend + devj-frontend) ----
# Joins the shared production server's proxy_net — see docker-compose.yml header.

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

# Re-run from a machine with SSH access to the production server (see
# devops/ansible/inventory.ini and .env on the server for what's assumed).
# Assumes proxy_net already exists on the server (one-time setup, see
# devops/nginx/production/devj-portfolio.conf header) and that the shared
# reverse-proxy stack (/opt/reverse-proxy/, not part of this repo) is running.
# Set PROD_SERVER_USER / PROD_SERVER_HOST in your own shell env before running.
deploy:
	ssh "$(PROD_SERVER_USER)@$(PROD_SERVER_HOST)" \
		"cd /opt/devj-portfolio && docker compose pull && docker compose up --detach --remove-orphans"

# Deploys this project's shared-proxy site config to the INDEPENDENT
# /opt/reverse-proxy/ stack and reloads it. Deliberately NOT part of the
# GitHub Actions deploy workflow and NOT run on every push — it touches
# infrastructure outside this project's own container boundary and shared
# with the SMR project (see architecture.md R-8, devops-done.md "Rev 3
# Addendum" for the full reasoning). Run by hand, deliberately, only when
# devj-portfolio.conf actually changes.
deploy-proxy-conf:
	scp devops/nginx/production/devj-portfolio.conf \
		"$(PROD_SERVER_USER)@$(PROD_SERVER_HOST):/opt/reverse-proxy/conf.d/devj-portfolio.conf"
	ssh "$(PROD_SERVER_USER)@$(PROD_SERVER_HOST)" \
		"docker exec shared_nginx_proxy nginx -t && docker exec shared_nginx_proxy nginx -s reload"

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
