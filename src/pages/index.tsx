import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          SYNAPSE
        </Heading>
        <p className="hero__subtitle">Open-Source AI Agent Platform for Teams</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start">
            Get Started →
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation"
            style={{marginLeft: '1rem'}}>
            Install SYNAPSE
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>🤖 Intelligent Agents</h3>
              <p>
                Build and deploy AI agents with memory, tool access, and conversation capabilities.
                Support for multiple LLM providers including OpenAI, Anthropic, and local models.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>🔌 Extensible Plugin System</h3>
              <p>
                Extend agent capabilities with custom plugins. Web search, file operations,
                API integrations, and more. Write plugins in Python or Java.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>👥 Team Collaboration</h3>
              <p>
                Multi-user platform with team management, resource sharing, and
                role-based access control. Built for self-hosting and team productivity.
              </p>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '3rem'}}>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>🐳 Docker-First Deployment</h3>
              <p>
                Production-ready Docker Compose setup. Optional Kubernetes support.
                Simple installation for homelab, VMs, and bare-metal servers.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>🧠 Advanced Memory System</h3>
              <p>
                Vector-based semantic memory with Qdrant. Short-term and long-term memory.
                Context retention across conversations and teams.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <h3>🔒 Self-Hosted & Secure</h3>
              <p>
                Full control over your data. No vendor lock-in. Open-source platform
                designed for privacy-conscious teams and organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <h2>Quick Links</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h3>📚 Documentation</h3>
              </div>
              <div className="card__body">
                <ul>
                  <li><Link to="/docs/getting-started/introduction">Introduction</Link></li>
                  <li><Link to="/docs/concepts/architecture">Architecture</Link></li>
                  <li><Link to="/docs/api/overview">API Reference</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h3>🚀 Deployment</h3>
              </div>
              <div className="card__body">
                <ul>
                  <li><Link to="/docs/deployment/docker-compose">Docker Compose</Link></li>
                  <li><Link to="/docs/deployment/bare-metal">Bare Metal</Link></li>
                  <li><Link to="/docs/deployment/kubernetes">Kubernetes</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h3>🔌 Plugins</h3>
              </div>
              <div className="card__body">
                <ul>
                  <li><Link to="/docs/plugins/overview">Plugin Overview</Link></li>
                  <li><Link to="/docs/plugins/development/getting-started">Create Plugin</Link></li>
                  <li><Link to="/docs/plugins/official/overview">Official Plugins</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h3>💻 Development</h3>
              </div>
              <div className="card__body">
                <ul>
                  <li><Link to="/docs/development/contributing">Contributing</Link></li>
                  <li><Link to="/docs/development/architecture-deep-dive">Architecture Deep Dive</Link></li>
                  <li><Link to="/docs/development/testing">Testing</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="SYNAPSE - Open-Source AI Agent Platform for Teams. Self-hosted, extensible, and production-ready.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickLinks />
      </main>
    </Layout>
  );
}
