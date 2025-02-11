import   { useState, useEffect } from 'react';
import { Mail, Lock, User, Github } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle Google Sign In
  const handleGoogleSignIn = () => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        callback: handleGoogleCallback
      });
      window.google.accounts.id.prompt();
    }
  };

  const handleGoogleCallback = (response) => {
    // Handle the Google Sign-In response
    console.log('Google Sign-In successful:', response);
    // Add your authentication logic here
  };

  // Load Google Sign-In script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex h-screen  ">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-black">
        <div className="space-y-7">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 text-transparent bg-clip-text">
            Welcome to Projectify
          </h1>
          <p className="text-xl text-black p-5">Manage your research and thesis with amazing tools.</p>
          <div className="flex space-x-5">
            <div className="w-12 h-1 bg-white opacity-50 rounded-full" />
            <div className="w-12 h-1 bg-white rounded-full" />
            <div className="w-12 h-1 bg-white opacity-50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-blue-500 text-black bg-clip-text">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-black opacity-70">
              {isLogin ? 'Sign in to continue your journey' : 'Begin your creative journey today'}
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-black/10 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/25"
                  />
                  <User className="absolute right-3 top-3 text-black/50 h-5 w-5" />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-black/10 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/25"
                  />
                  <User className="absolute right-3 top-3 text-black/50 h-5 w-5" />
                </div>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-black/10 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/25"
              />
              <Mail className="absolute right-3 top-3 text-black/50 h-5 w-5" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-3 bg-black/10 rounded-xl text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/25"
              />
              <Lock className="absolute right-3 top-3 text-black/50 h-5 w-5" />
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-black/50">Or continue with</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                type="button"
                className="flex-1 py-3 bg-black/10 rounded-xl text-black hover:bg-black/20 transition-colors flex items-center justify-center space-x-2"
                onClick={() => {/* Add Github login logic */}}
              >
                <Github className="h-5 w-5" />
                <span>Github</span>
              </button>
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="flex-1 py-3 bg-black/10 rounded-xl text-black hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Google</span>
              </button>
            </div>

            <p className="text-center text-black/50 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-black hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;