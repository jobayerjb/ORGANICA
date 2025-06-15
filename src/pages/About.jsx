import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: t("about.team.member1.name"),
      role: t("about.team.member1.role"),
      bio: t("about.team.member1.bio"),
      color: "bg-gradient-to-r from-amber-400 to-orange-500",
    },
    {
      id: 2,
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      bio: t("about.team.member2.bio"),
      color: "bg-gradient-to-r from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      bio: t("about.team.member3.bio"),
      color: "bg-gradient-to-r from-purple-400 to-fuchsia-500",
    },
  ];

  // Company milestones
  const milestones = [
    {
      year: "2015",
      title: t("about.milestones.2015.title"),
      description: t("about.milestones.2015.desc"),
    },
    {
      year: "2018",
      title: t("about.milestones.2018.title"),
      description: t("about.milestones.2018.desc"),
    },
    {
      year: "2020",
      title: t("about.milestones.2020.title"),
      description: t("about.milestones.2020.desc"),
    },
    {
      year: "2023",
      title: t("about.milestones.2023.title"),
      description: t("about.milestones.2023.desc"),
    },
  ];

  // Values
  const values = [
    {
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.desc"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: t("about.values.quality.title"),
      description: t("about.values.quality.desc"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: t("about.values.sustainability.title"),
      description: t("about.values.sustainability.desc"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-28 md:py-36 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t("about.hero.subtitle")}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                {t("about.hero.cta1")}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                {t("about.hero.cta2")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              {t("about.mission.title")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              {t("about.mission.content")}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-amber-500 mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("about.timeline.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("about.timeline.subtitle")}
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-amber-600"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`mb-12 flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end mb-4 md:mb-0">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 md:mr-4"
                        : "bg-gradient-to-r from-blue-500 to-cyan-600 md:ml-4"
                    }`}
                  >
                    {milestone.year}
                  </div>
                </div>
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-48 ${member.color} relative`}>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden">
                    <div
                      className={`w-full h-full ${member.color} flex items-center justify-center text-white text-2xl font-bold`}
                    >
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="pt-16 pb-8 px-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-amber-400 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-300">{member.bio}</p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-amber-400">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-400">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("about.cta.title")}
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              {t("about.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                {t("about.cta.button1")}
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-cyan-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                {t("about.cta.button2")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
