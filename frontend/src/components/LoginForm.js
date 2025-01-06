export const LoginForm = ({ username, onUsernameChange, onSubmit }) => (
    <form onSubmit={onSubmit} style={{ 
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }}>
      <h2 style={{ 
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
      }}>
        Bienvenido al Chat Analitika Deep Web
      </h2>
      <input
        placeholder="Ingresa tu nombre"
        value={username}
        onChange={onUsernameChange}
        style={{ 
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '16px'
        }}
      />
      <button type="submit" style={{ 
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}>
        Comenzar Chat
      </button>
    </form>
   );