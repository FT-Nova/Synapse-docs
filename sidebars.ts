import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gettingStartedSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/introduction',
        'getting-started/quick-start',
        'getting-started/installation',
        'getting-started/first-agent',
      ],
    },
  ],

  conceptsSidebar: [
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'concepts/architecture',
        'concepts/agents',
        'concepts/conversations',
        'concepts/memory-system',
        'concepts/plugins',
        'concepts/teams',
      ],
    },
  ],

  guidesSidebar: [
    {
      type: 'category',
      label: 'User Guides',
      items: [
        'guides/agent-management',
        'guides/team-collaboration',
        'guides/plugin-development',
        'guides/memory-configuration',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/rest-api',
        'api/websocket-api',
        'api/authentication',
        'api/error-handling',
      ],
    },
  ],

  pluginsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'plugins/overview',
        'plugins/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Official Plugins',
      collapsed: false,
      items: [
        'plugins/official/overview',
        'plugins/official/web-search',
        'plugins/official/file-operations',
        'plugins/official/code-execution',
        'plugins/official/api-client',
      ],
    },
    {
      type: 'category',
      label: 'Community Plugins',
      collapsed: false,
      items: [
        'plugins/community/overview',
        'plugins/community/contributing',
      ],
    },
    {
      type: 'category',
      label: 'Official Bundles',
      collapsed: false,
      items: [
        'plugins/bundles/official/overview',
        'plugins/bundles/official/developer-toolkit',
      ],
    },
    {
      type: 'category',
      label: 'Community Bundles',
      collapsed: false,
      items: [
        'plugins/bundles/community/overview',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'plugins/development/getting-started',
        'plugins/development/plugin-tutorial',
        'plugins/development/bundle-tutorial',
        'plugins/development/testing',
        'plugins/development/publishing',
      ],
    },
  ],

  deploymentSidebar: [
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/docker-compose',
        'deployment/bare-metal',
        'deployment/kubernetes',
        'deployment/environment-variables',
        'deployment/reverse-proxy',
        'deployment/backup-restore',
        'deployment/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'administration/configuration',
        'administration/security',
        'administration/monitoring',
        'administration/upgrades',
      ],
    },
  ],

  developmentSidebar: [
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/contributing',
        'development/environment-setup',
        'development/architecture-deep-dive',
        'development/database-schema',
        'development/testing',
        'development/release-process',
      ],
    },
  ],
};

export default sidebars;
