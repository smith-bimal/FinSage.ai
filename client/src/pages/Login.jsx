import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { authService } from '../services/auth.service.js';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const location = useLocation();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(location.state?.signup || false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update isSignup state if navigated with state
    if (location.state?.signup !== undefined) {
      setIsSignup(location.state.signup);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignup) {
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        // Registration flow
        const data = await authService.register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || '',
          address: {
            line1: formData.addressLine1 || '',
            line2: formData.addressLine2 || '',
            state: formData.state || '',
            country: formData.country || '',
            zipCode: formData.zipCode || ''
          }
        });

        // Context login after registration
        if (data.user && data.token) {
          console.log("Registration successful, logging in user:", data.user);
          login(data.user, data.token);
          // Redirect is now handled in the login function in context
        } else {
          console.error("Registration response missing user or token:", data);
          setError('Registration successful but login failed. Please try logging in.');
        }
      } else {
        // Login flow
        const data = await authService.login({
          email: formData.email,
          password: formData.password
        });
        
        // Context login after authentication
        if (data.user && data.token) {
          console.log("Login successful, user data:", data.user);
          login(data.user, data.token);
          // Redirect is now handled in the login function in context
        } else {
          console.error("Login response missing user or token:", data);
          setError('Authentication successful but user data is missing. Please try again.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-[#211225] p-6">
      <div className="flex flex-col md:flex-row bg-black/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-gray-800/50 overflow-hidden max-w-6xl w-full min-h-[600px]">
        {/* Left Panel */}
        <div className="relative p-10 md:w-1/2 bg-gradient-to-br from-gray-900/60 to-gray-800/40 flex flex-col justify-end">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white/90">
              {isSignup ? "Build Your Future" : "Welcome Back"}
            </h2>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {isSignup ? "Smart Financial Insights" : "Let's Continue"}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {isSignup
                ? "Make better business decisions with our powerful simulation tools."
                : "Your financial insights await."
              }
            </p>

            <div className="flex items-center space-x-6 pt-8">
              {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="transform hover:scale-110 hover:text-purple-400 transition-all duration-300 text-gray-500"
                >
                  <i className={`fab fa-${social} fa-lg`}></i>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsSignup(!isSignup)}
              className="group text-gray-400 hover:text-gray-300 transition-colors duration-300 mt-4"
            >
              {isSignup ? "Have an account?" : "First time here?"}{' '}
              <span className="text-purple-400 group-hover:text-purple-300 underline">
                {isSignup ? "Sign in" : "Join now"}
              </span>
            </button>
          </div>
        </div>

        {/* Form Panel */}
        <div className="p-10 md:w-1/2 bg-gradient-to-br from-gray-900/50 to-black/50">
          <form onSubmit={handleSubmit} className="space-y-6 h-full" autoComplete="off" spellCheck="false">
            {/* Display error message if present */}
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-600/30 rounded-lg text-red-400 text-sm mb-4">
                {error}
              </div>
            )}
            {isSignup ? (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Create Your Account</h3>
                  <p className="text-gray-400">Join us to experience next-gen financial solutions</p>
                </div>

                <div className="space-y-6">
                  {/* Email & Password Section */}
                  <div className="space-y-4">
                    <div className="space-y-8">
                      <div className="flex space-x-4">
                        {["First Name", "Last Name"].map((label, i) => (
                          <div key={label} className="relative w-1/2 group">
                            <input
                              type="text"
                              placeholder={label}
                              autoComplete="off"
                              className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                              onChange={(e) => setFormData({ ...formData, [i === 0 ? 'firstName' : 'lastName']: e.target.value })}
                              required
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                          </div>
                        ))}
                      </div>

                      <div className="relative group">
                        <input
                          type="email"
                          placeholder="Email Address"
                          autoComplete="off"
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="relative w-1/2 group">
                          <input
                            type="password"
                            placeholder="Create Password"
                            autoComplete="new-password"
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                        </div>
                        <div className="relative w-1/2 group">
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Password must contain Special character, capital & simple letters and a number
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Login Section */}
                <div className="pt-6 mt-8 border-t border-gray-800">
                  <div className="text-center mb-6 text-gray-500">Or sign up with</div>
                  <div className="grid grid-cols-3 gap-4 text-white">
                    {["Google", "Apple", "Github"].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        className="p-2 cursor-pointer border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800/30 transition-all duration-300"
                      >
                        <i className={`ri-${provider.toLowerCase()}-fill text-xl mr-2`}></i>{provider}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // Login mode content
              <>
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
                  <p className="text-gray-400">Please sign in to access your account</p>
                </div>

                <div className="space-y-8">
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      autoComplete="off"
                      className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                  </div>

                  <div className="relative group">
                    <input
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:border-blue-400 text-white placeholder-gray-500 outline-none transition-all duration-300"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-focus-within:w-full transition-all duration-300"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mb-6">
                  <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="mr-2 w-4 h-4 rounded border-gray-600 bg-transparent" />
                    Remember me
                  </label>
                  <a href="#" className="text-purple-400 hover:text-purple-300">Forgot Password?</a>
                </div>

                <div className="pt-6 mt-8 border-t border-gray-800">
                  <div className="text-center mb-6 text-gray-500">Or continue with</div>
                  <div className="grid grid-cols-3 gap-4 text-white">
                    {["Google", "Apple", "Github"].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        className="p-2 cursor-pointer border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800/30 transition-all duration-300"
                      >
                        <i className={`ri-${provider.toLowerCase()}-fill text-xl mr-2`}></i>{provider}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transform hover:scale-[1.01] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Sign In'}
                  <i className="fas fa-arrow-right ml-2"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}