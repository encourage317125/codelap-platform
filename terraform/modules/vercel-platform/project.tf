#data "auth0_client" "web_client" {
#  name = "Codelab Web Client"
#}

# Cycle doesn't work
#data "vercel_project" "builder" {
#  name = vercel_project.builder.name
#}

# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "platform" {
  name      = "platform"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type              = "github"
    repo              = "codelab-app/platform"
    production_branch = "master"
  }

  root_directory = "apps/platform"

  build_command    = "../../scripts/vercel/platform/build.sh"
  install_command  = "../../scripts/vercel/platform/install.sh"
  ignore_command   = "../../scripts/vercel/platform/ignore.sh"
  output_directory = "../../dist/apps/platform/.next"

  serverless_function_region = "sfo1"

  environment = [
    {
      target = ["production", "preview"]
      key    = "NEXT_PUBLIC_PLATFORM_HOST"
      value  = var.next_public_platform_host
    },
    {
      target = ["production", "preview"]
      key    = "PLATFORM_API_HOST"
      value  = var.platform_api_host
    },
    # Auth0UBLIC_PLATFORM_HOST=127.0.0.1:3001
    {
      target = ["production", "preview"]
      key    = "AUTH0_ISSUER_BASE_URL"
      value  = var.auth0_issuer_base_url
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_SECRET"
      value  = var.auth0_secret
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_CLIENT_SECRET"
      # This isn't working
      # value = data.auth0_client.web_client.client_secret
      value = var.auth0_web_client_secret
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_CLIENT_ID"
      # This isn't working
      # value = data.auth0_client.web_client.id
      value = var.auth0_web_client_id
    },
    {
      target = ["production", "preview"]
      key    = "AUTH0_AUDIENCE"
      value  = "${var.auth0_issuer_base_url}api/v2/"
    },
    # Neo4j
    {
      target = ["production", "preview"]
      key    = "NEO4J_USER"
      value  = var.neo4j_user
    },
    {
      target = ["production", "preview"]
      key    = "NEO4J_URI"
      value  = var.neo4j_uri
    },
    {
      target = ["production", "preview"]
      key    = "NEO4J_PASSWORD"
      value  = var.neo4j_password
    },
    # Vercel
    {
      target = ["production", "preview"]
      key    = "VERCEL_ACCESS_TOKEN"
      value  = var.vercel_access_token
    },
    {
      target = ["production", "preview"]
      key    = "VERCEL_PROJECT_ID"
      # Cannot have self-referencing ID
      # https://github.com/hashicorp/terraform/issues/3267
      #      value = vercel_project.builder.id
      #      value = data.vercel_project.builder.id
      value = var.vercel_platform_project_id
    },
    {
      target = ["production", "preview"]
      key    = "VERCEL_TEAM_ID"
      value  = var.vercel_team_id
    },
    {
      target = ["production"]
      key    = "VERCEL_FORCE_NO_BUILD_CACHE"
      value  = "1"
    }
  ]
}

