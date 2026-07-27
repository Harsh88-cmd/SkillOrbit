import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 pt-14 pb-20 md:pt-20 md:pb-28">
            <div className="flex flex-col md:flex-row items-center gap-12">

                {/* Left: Content */}
                <div className="w-full md:w-[48%] text-center md:text-left space-y-6">

                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                        Built for coders, by coders
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                            Learn to Code.
                        </h1>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                            Teach to Code.
                        </h1>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-violet-700">
                            Ship Together.
                        </h1>
                    </div>

                    <p className="text-lg text-base-content/70 max-w-md mx-auto md:mx-0">
                        Trade the language you know for the one you want to learn.
                        SkillOrbit pairs coding students for real, live pair-programming
                        sessions — no course fees, just code changing hands.
                    </p>

                    <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                        <button onClick={() => navigate("/signup")} className="btn btn-primary btn-md md:btn-lg shadow-lg shadow-violet-700/20">
                            Get Started
                        </button>
                        <button className="btn btn-outline btn-primary btn-md md:btn-lg">
                            How it Works
                        </button>
                    </div>

                    {/* Trust strip */}
                    <div className="pt-6 flex items-center justify-center md:justify-start gap-6 text-sm text-base-content/60">
                        <div>
                            <span className="font-bold text-base-content">500+</span> coders
                        </div>
                        <div className="h-4 w-px bg-base-content/15" />
                        <div>
                            <span className="font-bold text-base-content">30+</span> languages & frameworks
                        </div>
                        <div className="h-4 w-px bg-base-content/15" />
                        <div>
                            <span className="font-bold text-base-content">3,000+</span> pair sessions
                        </div>
                    </div>
                </div>

                {/* Right: Hero visual — skill swap motif */}
                <div className="w-[120px] md:w-[60%] flex justify-center items-center relative">
                    <img
                        src="/landingpage.jpeg"
                        alt="Coding students pair programming"
                        className="w-full max-w-[560px] h-auto object-contain rounded-2xl"
                    />

                    {/* Floating swap card — the signature element */}
                    <div className="hidden md:flex absolute -bottom-4 left-4 items-center gap-3 rounded-2xl bg-base-100 border border-base-content/10 shadow-xl px-4 py-3">
                        <div className="flex flex-col items-center">
                            <span className="badge badge-primary badge-sm">React</span>
                            <span className="text-[10px] text-base-content/50 mt-1">Teaching</span>
                        </div>
                        <div className="flex flex-col items-center text-violet-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 10h13M17 6l4 4-4 4" />
                                <path d="M17 14H4M7 18l-4-4 4-4" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="badge badge-outline badge-primary badge-sm">Rust</span>
                            <span className="text-[10px] text-base-content/50 mt-1">Learning</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero