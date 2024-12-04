import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-white text-2xl"
      >
        <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin" />
      </motion.div>
    </div>
  );
} 