import React from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ isVisible, children, onClose }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
          className="modal-backdrop"
          // onClick={onClose}
        >
          <motion.div
            initial={{
              translateY: 20,
            }}
            animate={{
              translateY: 0,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              translateY: 50,
            }}
            className="modal-content"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
