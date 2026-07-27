import { useNavigate } from "react-router-dom";

const CTASection = () => {
      const navigate = useNavigate();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-violet-700 px-8 py-16 text-center md:py-20">

                    {/* Decorative swap icon, subtle */}
                    <svg
                        className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-white/10"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
                    >
                        <path d="M7 10h13M17 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 14H4M7 18l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
                        Ready to trade your first line of code?
                    </h2>
                    <p className="mt-4 text-violet-100 max-w-md mx-auto">
                        Join a community of coding students pair programming and leveling up, one session at a time.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <button onClick={() => navigate("/signup")} className="btn btn-md md:btn-lg bg-white text-violet-700 border-none hover:bg-violet-50 ">
                            Create your profile
                        </button>
                        <button className="btn btn-md md:btn-lg btn-outline border-white text-white hover:bg-white/10">
                            Browse languages
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection