const steps = [
    {
        number: '01',
        title: 'Create your profile',
        description: 'Add the languages and frameworks you can teach, and the ones you\'re hoping to learn.',
    },
    {
        number: '02',
        title: 'Send a request',
        description: 'Find a coder whose stack complements yours and send them a connection request.',
    },
    {
        number: '03',
        title: 'Code together',
        description: 'Once connected, schedule a session, hop on a video call, and pair program live.',
    },
]

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto text-center space-y-3 mb-16">
                    <span className="text-xs font-semibold tracking-wide text-violet-700 uppercase">
                        The process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Three steps to your first swap
                    </h2>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                    {/* Connector line for desktop */}
                    <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-base-content/10" />

                    {steps.map((step) => (
                        <div key={step.number} className="relative text-center md:text-left space-y-3">
                            <div className="relative z-10 mx-auto md:mx-0 h-12 w-12 rounded-full bg-violet-700 text-white flex items-center justify-center font-bold text-sm">
                                {step.number}
                            </div>
                            <h3 className="font-bold text-xl pt-1">{step.title}</h3>
                            <p className="text-sm text-base-content/70 leading-relaxed max-w-xs mx-auto md:mx-0">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks