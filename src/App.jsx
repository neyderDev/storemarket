import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

// --- Iconos de Lucide React (simulados con SVG para un solo archivo) ---

// Icono de Casa/Dashboard
const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

// Icono de Usuario/Perfil
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

// Icono de Salir
const LogOutIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

// Icono de Candado
const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);


// ----------------------------------------------------------------------
// 1. COMPONENTE LOGIN
// ----------------------------------------------------------------------

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulación de autenticación
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        onLogin({
          id: 'u123',
          name: 'Jane Doe',
          email: 'test@example.com',
          role: 'Administrador',
          bio: 'Apasionada por el desarrollo frontend y la experiencia de usuario. Siempre buscando simplificar procesos.'
        });
      } else {
        setError('Credenciales inválidas. Usa test@example.com / password');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl">
        <div className="flex justify-center mb-6 text-indigo-600">
          <LockIcon className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Accede a tu Dashboard personalizado.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white transition duration-200 shadow-md ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. COMPONENTE DASHBOARD
// ----------------------------------------------------------------------

const DashboardPage = () => {
  // Datos simulados para el dashboard
  const stats = [
    { name: 'Usuarios Activos', value: '2,450', icon: UserIcon, color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Proyectos Abiertos', value: '47', icon: HomeIcon, color: 'bg-green-100 text-green-800' },
    { name: 'Tasa de Conversión', value: '12.4%', icon: LockIcon, color: 'bg-yellow-100 text-yellow-800' },
  ];

  return (
    <div className="p-4 sm:p-8 flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
        Resumen del Dashboard
      </h1>

      {/* Contenedor de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Actividad Reciente */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Actividad Reciente
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between items-center">
            <p className="text-gray-700">Documento "Reporte Q3" actualizado.</p>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Hace 15 min</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <p className="text-gray-700">Nuevo usuario registrado: David C.</p>
            <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">Hace 2 horas</span>
          </li>
          <li className="py-3 flex justify-between items-center">
            <p className="text-gray-700">Tarea #5 completada en el Proyecto Alpha.</p>
            <span className="text-xs text-indigo-500 bg-indigo-100 px-2 py-1 rounded-full">Ayer</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. COMPONENTE PERFIL
// ----------------------------------------------------------------------

const ProfilePage = ({ user }) => {
  return (
    <div className="p-4 sm:p-8 flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
        Mi Perfil
      </h1>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
        {/* Lado Izquierdo: Avatar e Info Principal */}
        <div className="p-8 md:w-1/3 bg-indigo-50 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-6xl font-bold border-4 border-white shadow-lg">
              {user.name.charAt(0)}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-md text-indigo-600 font-semibold mt-1">{user.role}</p>
          <p className="text-sm text-gray-500 mt-2 text-center">{user.email}</p>
        </div>

        {/* Lado Derecho: Detalles */}
        <div className="p-8 md:w-2/3">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Información de Contacto y Biografía</h3>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">ID de Usuario</p>
              <p className="text-gray-900 mt-1 font-mono bg-gray-100 p-2 rounded-lg inline-block text-sm">{user.id}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">Rol del Sistema</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {user.role}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Biografía</p>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                {user.bio}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// 4. COMPONENTE PRINCIPAL (App)
// ----------------------------------------------------------------------

const Header = ({ isLoggedIn, user, onLogout, setPage, currentPage }) => {

  const navItemClass = (page) =>
    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ${
      currentPage === page
        ? 'bg-indigo-700 text-white shadow-lg'
        : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
    }`;

  return (
    <header className="bg-indigo-800 shadow-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Título */}
          <div className="flex items-center">
            <span className="text-white text-xl font-bold tracking-wider">
              Sistema de Gestión
            </span>
          </div>

          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              {/* Navegación */}
              <nav className="hidden md:flex space-x-1">
                <button
                  onClick={() => setPage('dashboard')}
                  className={navItemClass('dashboard')}
                >
                  <HomeIcon className="w-5 h-5 mr-1" />
                  Dashboard
                </button>
                <button
                  onClick={() => setPage('profile')}
                  className={navItemClass('profile')}
                >
                  <UserIcon className="w-5 h-5 mr-1" />
                  Perfil
                </button>
              </nav>

              {/* Botón de Perfil/Logout */}
              <div className="flex items-center space-x-3 text-white">
                <span className="text-sm hidden sm:block">
                  Hola, <span className="font-semibold">{user.name.split(' ')[0]}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-150 shadow-md"
                  title="Cerrar Sesión"
                >
                  <LogOutIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


const App = () => {
  // Estado para simular la autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // Estado para simular el enrutamiento (React Router)
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('dashboard'); // Redirigir al dashboard después del login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('login'); // Redirigir al login después del logout
  };

  // Efecto para simular la carga inicial (podría ser una verificación de token)
  useEffect(() => {
    // Si hubiese lógica de token, se pondría aquí. Por ahora, inicia deslogueado.
  }, []);

  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage user={user} />;
      default:
        // Si está logueado pero la página no existe, va al dashboard
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        user={user || { name: '' }}
        onLogout={handleLogout}
        setPage={setCurrentPage}
        currentPage={currentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="w-full bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
        &copy; 2024 Aplicación Moderna. Desarrollada con React y TailwindCSS.
      </footer>
    </div>
  );
};

export default App;