import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate()

    const features = [
        {
            icon: "💪",
            title: "Premium Plans",
            description: "Choose from flexible membership options tailored to your fitness goals"
        },
        {
            icon: "📊",
            title: "Track Progress",
            description: "Monitor your membership status and workout journey in one place"
        },
        {
            icon: "🔒",
            title: "Secure Payments",
            description: "Fast and secure payment processing with Razorpay integration"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-dark overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl"></span>
                        <span className="text-xl font-bold text-gray-900">GymBro</span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-5 py-2.5 text-gray-700 font-medium hover:text-black transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-primary"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float delay-300"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
                            Your Fitness Journey Starts Here
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-fade-in-up">
                        Transform Your
                        <span className="block bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent">
                            Body & Mind
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                        Join GymMate and get access to premium fitness plans, seamless payment processing,
                        and a dashboard to track your fitness journey.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20"
                        >
                            Start Free Trial
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                            Member Login
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up delay-400">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">500+</div>
                            <div className="text-gray-400 text-sm">Active Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">10+</div>
                            <div className="text-gray-400 text-sm">Fitness Plans</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-gray-400 text-sm">Gym Access</div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose GymMate?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage your gym membership in one powerful platform
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-gray-200 transition-all duration-500 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Join thousands of members who have transformed their lives with GymMate
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                        Get Started Now →
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 bg-black border-t border-gray-800">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🏋️</span>
                        <span className="text-lg font-bold text-white">GymMate</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2024 GymMate. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage