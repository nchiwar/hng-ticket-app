export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <h1>TicketMaster Pro</h1>
        <p>Streamline your workflow with elegant ticket management.</p>
        <div className="cta-buttons">
          <a href="/auth/login" className="btn">Login</a>
          <a href="/auth/signup" className="btn gradient">Get Started</a>
        </div>
      </div>
      <div className="deco-circle" style={{ top: '15%', right: '10%' }}></div>
      <svg className="wave">
        <use href="/assets/wave.svg#wave" />
      </svg>
    </section>
  );
}