const features = [
    {
        title: 'List your stack',
        description: 'Add the languages and frameworks you can teach, and the ones you want to pick up next.',
        icon: (
            <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        title: 'Find your match',
        description: 'Browse coders with complementary skills — a React dev looking for Rust, a backend dev looking for frontend — and send a request.',
        icon: (
            <>
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="14" r="3" />
                <path d="M9 11v0M17 11v3" strokeLinecap="round" />
            </>
        ),
    },
    {
        title: 'Pair program live',
        description: 'Book a time that works for both of you and jump into a built-in video call to code together.',
        icon: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 11h18" strokeLinecap="round" />
            </>
        ),
    },
    {
        title: 'Track your progress',
        description: 'See your connections, upcoming sessions, and skills learned at a glance from your dashboard.',
        icon: (
            <path d="M4 19V9M12 19V5M20 19v-7" strokeLinecap="round" />
        ),
    },
]

const Features = () => {
    return (
        <section id="features" className=" bg-base-200/50 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto text-center space-y-3 mb-14">
                    <span className="text-xs font-semibold tracking-wide text-violet-700 uppercase">
                        Why SkillXChange
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Everything you need to trade code skills
                    </h2>
                    <p className="text-base-content/70">
                        No bootcamp fees, no middleman — just coding students leveling each other up.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl bg-base-100 border border-base-content/10 p-6 space-y-4 hover:border-violet-300 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="h-11 w-11 rounded-xl bg-violet-700/10 flex items-center justify-center text-violet-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                    {feature.icon}
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg">{feature.title}</h3>
                            <p className="text-sm text-base-content/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features