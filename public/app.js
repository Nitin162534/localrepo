const { useState, useEffect } = React;

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [register, setRegister] = useState({ username: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = product => setCart([...cart, product]);

  const handleLogin = e => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login)
    }).then(res => {
      if (res.ok) setLoggedIn(true);
    });
  };

  const handleRegister = e => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(register)
    }).then(res => {
      if (res.ok) alert('Registered! Please log in.');
    });
  };

  return (
    <div>
      {loggedIn ? (
        <p>Logged In</p>
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <input
              placeholder="Username"
              value={login.username}
              onChange={e => setLogin({ ...login, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
          <form onSubmit={handleRegister}>
            <input
              placeholder="New Username"
              value={register.username}
              onChange={e => setRegister({ ...register, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="New Password"
              value={register.password}
              onChange={e =>
                setRegister({ ...register, password: e.target.value })
              }
            />
            <button type="submit">Register</button>
          </form>
        </>
      )}

      <input
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item, idx) => (
        <div key={idx}>{item.name}</div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
