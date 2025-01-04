export const LoginForm = ({ username, onUsernameChange, onSubmit }) => (
    <form onSubmit={onSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <input
        placeholder="Ingresa tu nombre"
        value={username}
        onChange={onUsernameChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px' }}>
        Comenzar Chat
      </button>
    </form>
  );