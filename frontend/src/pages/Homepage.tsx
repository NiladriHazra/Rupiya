import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Homepage = function () {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);

    const handleSignup = () => {
        navigate("/signup");
    };
    
    const handleSignin = () => {
        navigate("/signin");
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleExternalLinkClick = () => {
        window.location.href = "https://solana-rupiya.vercel.app/";
    };

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-400 to-blue-500'} overflow-hidden transition-colors duration-500`}>
            <nav className="bg-white shadow-md dark:bg-gray-800">
                <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 animate-logo">
                                <img
                                    src="https://www.svgrepo.com/show/237651/rupee.svg"
                                    alt="Rupiya Logo"
                                    className="w-10"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center justify-center flex-grow">
                            <button 
                                onClick={handleSignup} 
                                className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110"
                            >
                                Sign Up
                            </button>
                            <button 
                                onClick={handleSignin} 
                                className="px-6 py-3 bg-white text-green-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="flex items-center ml-auto mr-0 space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 rounded-md text-sm font-medium"
                                style={{ animation: 'bounce3D 1.5s ease-in-out infinite' }}
                            >
                                <img
                                    src={darkMode ? "https://cdn-icons-png.flaticon.com/512/6077/6077087.png" : "https://cdn-icons-png.flaticon.com/512/6077/6077095.png"}
                                    alt="Toggle Dark Mode"
                                    className="w-20 h-20"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="text-center mb-10 mt-8">
                <h1 className="text-5xl font-bold mb-4">
                    Rupiya
                </h1>
                <p className="text-xl mt-4">
                    Your Gateway to Easy Money Transfers & Account Management
                </p>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <div 
                    onClick={handleExternalLinkClick} 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-12 px-20 rounded-lg shadow-xl cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l"
                    style={{
                        maxWidth: '90vw',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div 
                        className="absolute inset-0 bg-white opacity-10"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)',
                            transform: 'scale(1.5)',
                            animation: 'pulse 6s infinite ease-in-out',
                        }}
                    />
                    <h2 className="text-4xl font-extrabold mb-4">🚀 Visit Our Solana Rupiya</h2>
                    <p className="text-lg">
                        Click here 👉 to explore our Solana-based Web 3 platform and experience seamless money transfers.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <img
                        src="https://img.freepik.com/premium-vector/set-ui-ux-gui-screens-online-payment-app-template-mobile-apps-responsive-website-wireframes-web-design-ui-kit-online-shopping-onboarding-screens-vector-3d-illustration_145666-1501.jpg"
                        alt="Hero"
                        className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-4xl mb-8 rounded-lg shadow-lg"
                        style={{
                            transform: 'scale(1.05)',
                            transition: 'transform 0.5s ease-in-out'
                        }}
                    />
                </div>

                <div className="text-center mt-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        Why Choose Rupiya?
                    </h2>
                    <p className="text-lg">
                        Rupiya is the ultimate platform for all your money transfer needs. With our secure and user-friendly interface, you can send money instantly and manage your account with ease. Here's why you should choose Rupiya:
                    </p>
                </div>
                <br />
                <br />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                         style={{ 
                            transition: 'transform 0.3s',
                            transform: 'scale(1.05)'
                        }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    >
                        <h3 className="text-xl font-semibold mb-2 ">
                            Fast Transfers
                        </h3>
                        <p className="text-lg">Send money instantly with our fast transfer service. No delays, just quick transactions.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                         style={{ 
                            transition: 'transform 0.3s',
                            transform: 'scale(1.05)'
                        }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            Secure Transactions
                        </h3>
                        <p className="text-lg">Our top priority is your security. Enjoy peace of mind with encrypted transactions.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                         style={{ 
                            transition: 'transform 0.3s',
                            transform: 'scale(1.05)'
                        }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            User-Friendly Interface
                        </h3>
                        <p className="text-lg">Navigate effortlessly through our easy-to-use platform, designed for a smooth user experience.</p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        What Our Users Say
                    </h2>
                    <div className="flex flex-col items-center space-y-6">
                        <blockquote className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-white"
                          style={{ 
                            transition: 'transform 0.3s',
                            transform: 'scale(1.05)'
                          }}
                        >
                            <p className="text-lg mb-2">"Rupiya has transformed the way I manage my money. It's fast, secure, and incredibly easy to use!"</p>
                            <cite className="text-sm font-semibold">— Alex R.</cite>
                        </blockquote>
                        <blockquote className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-white"
                          style={{ 
                            transition: 'transform 0.3s',
                            transform: 'scale(1.05)'
                          }}
                        >
                            <p className="text-lg mb-2">"The best money transfer app I've used. Reliable and always available when I need it."</p>
                            <cite className="text-sm font-semibold">— Jamie T.</cite>
                        </blockquote>
                    </div>
                </div>

                <div className="flex space-x-4 items-center justify-center mt-12">
                    <button 
                        onClick={handleSignup} 
                        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110"
                    >
                        Get Started
                    </button>
                    <button 
                        onClick={handleSignin} 
                        className="px-6 py-3 bg-white text-green-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-110"
                    >
                        Sign In
                    </button>
                </div>
            </main>
        </div>
    );
};
