import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/openapi/synapse-rest-api",
    },
    {
      type: "category",
      label: "Health",
      link: {
        type: "doc",
        id: "api/openapi/health",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/get-platform-health",
          label: "High-level platform health",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/get-liveness",
          label: "Liveness probe",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/get-readiness",
          label: "Readiness probe",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Actuator",
      link: {
        type: "doc",
        id: "api/openapi/actuator",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/get-actuator-health",
          label: "Spring actuator health",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/get-prometheus-metrics",
          label: "Prometheus metrics scrape",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Memory",
      link: {
        type: "doc",
        id: "api/openapi/memory",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/list-agent-memory",
          label: "List memory entries for an agent",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/get-agent-memory-entry",
          label: "Get one memory entry",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/upsert-agent-memory-entry",
          label: "Upsert a memory entry",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/openapi/delete-agent-memory-entry",
          label: "Delete a memory entry",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/openapi/promote-agent-memory-entry",
          label: "Promote memory entry to a new tier",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Collaboration",
      link: {
        type: "doc",
        id: "api/openapi/collaboration",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/list-collaboration-sessions",
          label: "List collaboration sessions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/create-collaboration-session",
          label: "Create collaboration session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/get-collaboration-session",
          label: "Get collaboration session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/list-collaboration-messages",
          label: "List collaboration messages",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/send-collaboration-message",
          label: "Send collaboration message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/list-collaboration-delegations",
          label: "List delegation records",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/create-collaboration-delegation",
          label: "Create delegation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/list-collaboration-context",
          label: "List session context entries",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/upsert-collaboration-context",
          label: "Upsert session context key",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Planning",
      link: {
        type: "doc",
        id: "api/openapi/planning",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/list-planning-goals",
          label: "List team planning goals",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/create-planning-goal",
          label: "Create planning goal",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/get-planning-goal",
          label: "Get planning goal",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/list-goal-plans",
          label: "List plan versions for goal",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/create-goal-plan",
          label: "Create initial plan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/refine-goal-plan",
          label: "Refine an existing plan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/openapi/get-goal-next-step",
          label: "Get next non-complete step",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tools",
      link: {
        type: "doc",
        id: "api/openapi/tools",
      },
      items: [
        {
          type: "doc",
          id: "api/openapi/list-native-tools",
          label: "List registered native tools",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/get-native-tool",
          label: "Get native tool definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/openapi/execute-native-tool",
          label: "Execute native tool",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
