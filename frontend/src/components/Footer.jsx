const Footer = () => {
    return (
        <footer className="border-t border-base-content/10 bg-base-100">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    <div className="col-span-2">
                        <span className="text-xl font-extrabold tracking-tight">
                            Skill<span className="text-violet-700">O</span>rbit
                        </span>
                        <p className="mt-3 text-sm text-base-content/60 max-w-xs">
                            A platform where coding students exchange skills, pair program,
                            and level each other up — one session at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-3">Product</h4>
                        <ul className="space-y-2 text-sm text-base-content/60">
                            <li><a className="hover:text-violet-700" href="#">How it Works</a></li>
                            <li><a className="hover:text-violet-700" href="#">Browse Languages</a></li>
                            <li><a className="hover:text-violet-700" href="#">Dashboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-3">Company</h4>
                        <ul className="space-y-2 text-sm text-base-content/60">
                            <li><a className="hover:text-violet-700" href="#">About</a></li>
                            <li><a className="hover:text-violet-700" href="#">Contact</a></li>
                            <li><a className="hover:text-violet-700" href="#">Privacy</a></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-10 pt-6 border-t border-base-content/10 text-center text-xs text-base-content/50">
                    © {new Date().getFullYear()} SkillXChange. Built by coders, for coders.
                </div>
            </div>
        </footer>
    )
}

export default Footer