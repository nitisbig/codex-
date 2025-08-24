const projects = [
  {
    title: 'Project Alpha',
    description: 'Responsive web app built with Next.js.',
    link: '#'
  },
  {
    title: 'Project Beta',
    description: 'Data visualization dashboard using D3.js.',
    link: '#'
  },
  {
    title: 'Project Gamma',
    description: 'Mobile-first design for an e-commerce platform.',
    link: '#'
  }
];

export default function Home() {
  return (
    <div className="dashboard">
      <header className="hero">
        <h1>Your Name</h1>
        <p>Full-stack developer crafting modern web experiences.</p>
        <div className="social">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <section className="projects">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="card"
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>

      <style jsx>{`
        .dashboard {
          font-family: system-ui, sans-serif;
          color: #1f2937;
          line-height: 1.6;
        }
        .hero {
          padding: 4rem 1rem;
          text-align: center;
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          color: #fff;
        }
        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .hero p {
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }
        .social a {
          margin: 0 0.5rem;
          color: #fff;
          text-decoration: none;
          font-weight: 500;
        }
        .projects {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .projects h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }
        .grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .card {
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          background: #fff;
        }
        .card:hover {
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .footer {
          text-align: center;
          padding: 2rem 1rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}

