import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  };

  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`${bgColor[type]} text-white rounded-xl p-6 shadow-2xl flex gap-4 items-start max-w-md`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-2xl font-black flex-shrink-0 w-8 h-8 flex items-center justify-center"
      >
        {icon[type]}
      </motion.div>
      <div className="flex-grow">
        <h4 className="font-black text-lg mb-1">{title}</h4>
        {message && <p className="text-white/80 text-sm">{message}</p>}
      </div>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="text-white/70 hover:text-white text-2xl font-black flex-shrink-0"
      >
        ✕
      </motion.button>
    </motion.div>
  );
};

export default Notification;
