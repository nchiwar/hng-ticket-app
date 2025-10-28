export default function TicketCard({ ticket, onDelete }) {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description || 'No description'}</p>
      <span className={`tag ${ticket.status}`}>{ticket.status.replace('_', ' ')}</span>
      <button 
        onClick={() => onDelete(ticket.id)} 
        className="btn small" 
        style={{ background: '#dc3545', marginTop: '.5rem' }}
      >
        Delete
      </button>
    </div>
  );
}