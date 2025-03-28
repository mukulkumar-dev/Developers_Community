import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function Community() {
  const functions = [
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
    { name: 'QuantumSync', img: 'https://ouch-cdn2.icons8.com/53UJZ0wwG8_cXxZ0w-xgLzluk2QAfto5Seg3AFzS9bo/rs:fit:368:537/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTc1/LzFiMTk5Nzg2LWJl/YzYtNGJjOS1iYzY3/LTBjMDIxZjNkNzg2/My5wbmc.png' },
  ];
  
  return (
    <section className="min-h-screen relative p-0">
      <section className="min-h-screen bg-white flex flex-col items-center justify-center p-8 mt-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-5xl text-center"
        >
          <h2 className="text-5xl font-bold">
            Explore the <span className="text-blue-600">Developer Community</span>
          </h2>

          {/* Apps Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {functions.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay:  0}}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0px 4px 10px rgba(168, 85, 247, 0.7)',
                }}
                className="p-6 bg-white rounded-xl text-center shadow-lg border border-gray-200 cursor-pointer"
              >
                <img
                  src={app.img}
                  alt={app.name}
                  width={150}
                  height={150}
                  className="mx-auto"
                />
                <p className="mt-2 text-black font-semibold">{app.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1220 240"
          className="w-full h-full rotate-180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#0000cd"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,186.7C840,171,960,117,1080,101.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
