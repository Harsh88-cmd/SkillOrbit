const skills = [
    'JavaScript', 'Python', 'React', 'Node.js',
    'MongoDB', 'DSA', 'Java', 'System Design',
    'TypeScript', 'Rust', 'Docker', 'SQL',
]

const PopularSkills = () => {
    return (
        <section className="py-20 bg-base-200/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="max-w-xl mx-auto text-center space-y-3 mb-10">
                    <span className="text-xs font-semibold tracking-wide text-violet-700 uppercase">
                        Trending on SkillOrbit
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Languages & frameworks being swapped right now
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="badge badge-lg bg-base-100 border-base-content/10 text-base-content/80 hover:border-violet-400 hover:text-violet-700 transition-colors duration-150 px-4 py-3 cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularSkills