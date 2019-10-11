import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'

export const ContentPlaceholder = React.memo(() => {
  const inverted = useInvertedScale()
  return (
    <motion.div
      className="content-container"
      style={{ ...inverted, originY: 0, originX: 0 }}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus modi
        quibusdam inventore iure ut, dolorem perspiciatis doloremque at
        blanditiis reprehenderit eum sunt, sit veniam aperiam quisquam ipsum
        quis aut ad?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus modi
        quibusdam inventore iure ut, dolorem perspiciatis doloremque at
        blanditiis reprehenderit eum sunt, sit veniam aperiam quisquam ipsum
        quis aut ad?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus modi
        quibusdam inventore iure ut, dolorem perspiciatis doloremque at
        blanditiis reprehenderit eum sunt, sit veniam aperiam quisquam ipsum
        quis aut ad?
      </p>
      >
    </motion.div>
  )
})
