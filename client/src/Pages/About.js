import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='About-page'>
      <motion.div 
      initial={{
        opacity: 0,
        translateY: 200,
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      exit={{
        opacity: 0,
        translateY: 200
      }}
      className="about-box">
        <motion.h1
        initial={{
          opacity: 0,
          translateY: -100,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        exit={{
          opacity: 0,
          translateY: -100
        }}
        >About This Jesus</motion.h1>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          Welcome to This Jesus, a space where the heart of Christ is revealed and His love is made known. We are passionate about guiding you in your walk with Jesus Christ, bringing you into a deeper knowledge of God, and sharing the message of His saving grace with the world.
          </motion.p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          Life, with all its complexities and challenges, only begins to make sense when it is lived for Christ. In This Jesus, we seek to show you that there is more to your life than the day-to-day struggles, fears, or ambitions. You were created for something greater—an intimate relationship with Jesus, the One who loves you unconditionally and gave His life for you. 
          </motion.p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          Romans 5:8 reminds us, “But God demonstrates His own love for us in this: While we were still sinners, Christ died for us.” This love is not something distant or abstract; it is personal and transformative. It is the kind of love that meets you where you are, heals your wounds, breaks every chain, and sets you free to become the person God has destined you to be.
          </motion.p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          Through every post, teaching, and story on This Jesus, we aim to show you that there is no greater joy, no greater purpose, and no greater fulfillment than living a life fully surrendered to Christ. He has a plan for you, a future filled with hope, love, and endless possibilities. 
          </motion.p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          You are not an accident. You were created with intention, and your life carries meaning that goes beyond anything this world could offer. Ephesians 2:10 tells us, “For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.” That means you are meant for more—a life where you are deeply known, loved, and called by name.
          </motion.p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
          At This Jesus, we are committed to walking with you on this journey. Whether you're seeking answers, longing for more, or simply curious about this Jesus we speak of, know that you are welcome here. There is a place for you in the family of God.
          </motion.p>
          <p>
          So take this step today. Discover the love that will change your life forever, the truth that will set you free, and the joy that comes from living for This Jesus.
          </p>
          <motion.p
          initial={{
            opacity: 0,
            translateX: 1000,
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          exit={{
            opacity: 0,
            translateX: 1000
          }}
          >
            Thank you!
          </motion.p>
      </motion.div>
    </div>
  )
}

export default About