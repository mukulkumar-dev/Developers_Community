import {motion} from "framer-motion"
import Image from 'next/image';


export default function TeamCard({name, description}) {
    return (
      <div className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0.8, y: 0 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                opacity: 1,
                boxShadow: '0px 4px 10px rgba(168, 85, 247, 0.4)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="p-6 bg-white rounded-xl text-center shadow-lg border border-gray-200 cursor-pointer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=1l4Ua9PN0EDB&format=png&color=000000"
                alt={name}
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="mt-2 text-black font-semibold">{name}</p>
            </motion.div>
        </div>
    );
  }
  