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
