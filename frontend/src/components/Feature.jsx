import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Feature() {
  const features = [
    {
      title: "Find solutions to my problem",
      description:
        "Check if your problem is already solved or find workarounds. Our comprehensive knowledge base and community discussions help you troubleshoot issues efficiently. Get access to expert answers, detailed guides, and user-reported solutions to common challenges.",
      linkText: "Find solutions >",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/coding-project-1884980-1597918.png",
      imgAlt: "Find solutions",
      reverse: false,
    },
    {
      title: "Request new features",
      description:
        "Share your ideas for how we can improve the product to better suit your needs. Whether it's a new functionality, a UI enhancement, or performance improvements, your feedback helps shape the future of our platform. Submit your ideas and collaborate with our team and other users.",
      linkText: "Request new features >",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/coding-project-1884980-1597918.png",
      imgAlt: "Request new features",
      reverse: true,
    },
    {
      title: "Explore existing feature requests",
      description:
        "Search and filter through existing feedback to cast your vote and share your comments. Engage with the community by discussing proposed features, supporting innovative ideas, and helping prioritize the most requested updates. Your input directly impacts our roadmap.",
      linkText: "Explore feature requests >",
      imgSrc:
        "https://cdni.iconscout.com/illustration/premium/thumb/coding-project-1884980-1597918.png",
      imgAlt: "Explore feature requests",
      reverse: false,
    },
  ];

  return (
    <>
      <section className="bg-[#0000cd] text-white w-full py-20">
        <div className="max-w-6xl mx-auto px-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 my-20 ${
                feature.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full md:w-1/2"
              >
                <img
                  src={feature.imgSrc}
                  alt={feature.imgAlt}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg bg-white p-6"
                />
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full md:w-1/2 text-left"
              >
                <h2 className="text-2xl font-bold">{feature.title}</h2>
                <p className="mt-2 mb-8">{feature.description}</p>
                <Link href="/features">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-black mt-2 inline-block bg-white p-4 rounded cursor-pointer"
                  >
                    {feature.linkText}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
