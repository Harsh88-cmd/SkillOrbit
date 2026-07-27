import {FaCode,FaReact,FaNodeJs,FaPython,FaDatabase,} from "react-icons/fa";

const skills = [
  {
    name: "Web Development",
    progress: 95,
    requests: 128,
    icon: <FaCode className="text-blue-500 text-xl" />,
  },
  {
    name: "React.js",
    progress: 88,
    requests: 104,
    icon: <FaReact className="text-cyan-500 text-xl" />,
  },
  {
    name: "Node.js",
    progress: 82,
    requests: 91,
    icon: <FaNodeJs className="text-green-500 text-xl" />,
  },
  {
    name: "Python",
    progress: 70,
    requests: 76,
    icon: <FaPython className="text-yellow-500 text-xl" />,
  },
  {
    name: "MongoDB",
    progress: 60,
    requests: 64,
    icon: <FaDatabase className="text-emerald-500 text-xl" />,
  },
];

export default function TopSkills() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl">
      <div className="card-body">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Top Skills in Demand
          </h2>
        </div>

        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              {/* Rank */}
              <span className="font-bold text-lg w-6">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center">
                {skill.icon}
              </div>

              {/* Progress */}
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">
                    {skill.name}
                  </h3>

                  <span className="font-bold text-info">
                    {skill.progress}%
                  </span>
                </div>

                <progress
                  className="progress progress-info w-full h-3"
                  value={skill.progress}
                  max="100"
                ></progress>

                <p className="text-xs text-base-content/60 mt-1">
                  {skill.requests} requests
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}