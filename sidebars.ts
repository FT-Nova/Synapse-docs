import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  gettingStartedSidebar: [
    "getting-started/introduction",
    "getting-started/quick-start",
    "getting-started/installation",
    "getting-started/first-agent",
  ],

  conceptsSidebar: [
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "concepts/architecture",
        "concepts/agents",
        "concepts/conversations",
        "concepts/memory-system",
        "concepts/plugins",
        "concepts/teams",
      ],
    },
  ],

  guidesSidebar: [
    {
      type: "category",
      label: "User Guides",
      items: ["guides/team-collaboration", "guides/plugin-development"],
    },
  ],

  apiSidebar: [
    {
      type: "category",
      label: "API Reference",
      items: [
        "api/overview",
        "api/rest-api",
        "api/websocket-api",
        "api/authentication",
        "api/error-handling",
      ],
    },
  ],

  pluginsSidebar: [
    "plugins/overview",
    "plugins/architecture",
    {
      type: "category",
      label: "Plugin API Reference",
      items: ["plugins/plugin-api-reference"],
    },
    {
      type: "category",
      label: "Official Plugins",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Bundles",
          collapsed: true,
          items: [
            "plugins/bundles/official/overview",
            "plugins/bundles/official/developer-toolkit",
          ],
        },
        {
          type: "category",
          label: "Plugins",
          collapsed: true,
          items: [
            "plugins/official/overview",
            "plugins/official/web-search",
            "plugins/official/file-operations",
            "plugins/official/code-execution",
            "plugins/official/api-client",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Community Plugins",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Bundles",
          collapsed: true,
          items: ["plugins/bundles/community/overview"],
        },
        {
          type: "category",
          label: "Plugins",
          collapsed: true,
          items: ["plugins/community/overview"],
        },
        {
          type: "doc",
          id: "plugins/community/contributing",
        },
      ],
    },
    {
      type: "category",
      label: "Development",
      items: [
        "plugins/development/getting-started",
        "plugins/development/plugin-tutorial",
        "plugins/development/plugin-loader",
        "plugins/development/bundle-tutorial",
        "plugins/development/testing",
        "plugins/development/publishing",
      ],
    },
  ],

  deploymentSidebar: [
    {
      type: "category",
      label: "Deployment",
      items: [
        "deployment/docker-compose",
        "deployment/bare-metal",
        "deployment/kubernetes",
        "deployment/troubleshooting",
        {
          type: "category",
          label: "Environment Variables",
          collapsed: true,
          items: [
            "deployment/environment-variables/index",
            "deployment/environment-variables/core-system",
            "deployment/environment-variables/database",
            "deployment/environment-variables/redis",
            "deployment/environment-variables/qdrant",
            "deployment/environment-variables/security",
            "deployment/environment-variables/agent-store",
            "deployment/environment-variables/logging",
            "deployment/environment-variables/performance-hardening",
            "deployment/environment-variables/providers",
            "deployment/environment-variables/examples-and-secrets",
            "deployment/environment-variables/troubleshooting",
          ],
        },
        "deployment/reverse-proxy",
        "deployment/backup-restore",
      ],
    },
    {
      type: "category",
      label: "Administration",
      items: [
        "administration/configuration",
        "administration/security",
        "administration/monitoring",
        "administration/operations",
        "administration/upgrades",
      ],
    },
  ],

  developmentSidebar: [
    {
      type: "category",
      label: "Development",
      items: [
        "development/contributing",
        "development/environment-setup",
        "development/architecture-deep-dive",
        "development/package-structure",
        "development/database-schema",
        "development/testing",
        "development/release-process",
      ],
    },
  ],
};

export default sidebars;
