import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute top-0 left-0 w-full h-screen">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-purple-600/10 opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl bg-blue-600/10 opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-purple-800/20 to-transparent blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-blue-800/20 to-transparent blur-2xl"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.2 + Math.random() * 0.4,
              scale: Math.random() * 0.2 + 0.1,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 30 + 20,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
