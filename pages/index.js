import Head from 'next/head';

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
  // Home page redesigned with a static gradient hero and new layout.
  return (
    <div className="dashboard">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className="nav">
        <nav>
          <h1 className="logo">Your Name</h1>
          <div className="links">
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>
      <section className="hero">
        <h2>Building thoughtful experiences for the web.</h2>
        <p>Full-stack developer with a passion for design and code.</p>
      </section>
      <section id="projects" className="projects">
        <h2>Featured Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <a key={project.title} href={project.link} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </a>
          ))}
        </div>
      </section>
      <section id="contact" className="contact">
        <h2>Let's work together</h2>
        <p>
          Reach me at{' '}
          <a href="mailto:hello@example.com">hello@example.com</a>
        </p>
      </section>
      <footer className="footer">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>

      <style jsx>{`
        .dashboard {
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          line-height: 1.6;
        }
        .nav {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .nav nav {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-weight: 600;
          font-size: 1.25rem;
        }
        .links a {
          margin-left: 1rem;
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
        }
        .hero {
          background: linear-gradient(135deg, #6366f1, #3b82f6);
          color: #fff;
          text-align: center;
          padding: 6rem 1rem;
        }
        .hero h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .projects {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 1rem;
        }
        .projects h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .card {
          padding: 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .card p {
          color: #4b5563;
        }
        .card:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
          border-color: #6366f1;
        }
        .contact {
          background: #f9fafb;
          text-align: center;
          padding: 4rem 1rem;
        }
        .contact a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
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

