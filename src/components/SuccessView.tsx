'use client'

import { motion } from 'framer-motion';

export default function SuccessView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4 py-8 text-center"
    >
      <div className="text-4xl">✓</div>
      <h3 className="text-xl font-semibold text-foreground">
        提交成功！
      </h3>
      <p className="text-sm text-foreground/70 max-w-md">
        感谢你的反馈。我们已经收到你的需求，会尽快通过邮箱与你联系。
      </p>
      <p className="text-xs text-foreground/60 mt-4">
        我们永远不会索要你的私钥。
      </p>
    </motion.div>
  );
}
