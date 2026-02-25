import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, database } from './lib/firebaseConfig';
import Messages from './components/Messages';

const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL;

function LoginForm({ onLogin, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <main className="w-screen min-h-screen flex flex-col justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 w-full max-w-sm">
        <h1 className="font-extrabold text-2xl text-white text-center mb-2">Mis mensajes</h1>
        <p className="text-white/50 text-center text-sm mb-8">Acceso privado</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-gray-900 font-semibold rounded-xl py-3 mt-2 hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>

      <footer className="text-white font-light text-xs mt-8">
        Powered by <b className="shadow-bright">Moisés GJ</b>
      </footer>
    </main>
  );
}

function View() {
  const [data, setData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoginError('');
    setLoginLoading(true);

    if (!OWNER_EMAIL) {
      setLoginError('Configuración incompleta. Contacta al administrador.');
      setLoginLoading(false);
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (credential.user.email !== OWNER_EMAIL) {
        await signOut(auth);
        setLoginError('Acceso no autorizado.');
        return;
      }
      setIsOwner(true);
    } catch {
      setLoginError('Email o contraseña incorrectos.');
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (!isOwner) return;

    setDataLoading(true);
    const dbRef = ref(database);
    get(dbRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          setData([]);
          return;
        }
        const raw = snapshot.val();
        const reordered = Object.entries(raw).reduce((acc, [key, item]) => {
          const entry = { ...item, firebaseKey: key };
          if (item.imageURL) {
            acc.push(entry);
          } else {
            acc.unshift(entry);
          }
          return acc;
        }, []);
        setData(reordered);
      })
      .catch(console.error)
      .finally(() => setDataLoading(false));
  }, [isOwner]);

  if (!isOwner) {
    return (
      <LoginForm
        onLogin={handleLogin}
        error={loginError}
        loading={loginLoading}
      />
    );
  }

  return (
    <main className="w-screen py-10 flex flex-col justify-center items-center relative min-h-screen">
      <h1 className="font-extrabold text-3xl text-white my-5 mb-16">
        Mis mensajes <span className="text-xl md:text-3xl">({data.length})</span>
      </h1>

      {dataLoading ? (
        <p className="text-white/50 text-sm">Cargando mensajes...</p>
      ) : (
        <div className="my-5 flex flex-wrap gap-x-5 gap-y-16 justify-center px-3 pt-16">
          {data.map((element, indx) => (
            <Messages
              key={element.firebaseKey}
              author={element.author}
              message={element.message}
              date={element.date}
              id={indx}
              image={element.imageURL}
            />
          ))}
        </div>
      )}

      <footer className="text-white font-light text-xs md:text-sm mt-16">
        Powered by <b className="shadow-bright">Moisés GJ</b>
      </footer>
    </main>
  );
}

export default View;
