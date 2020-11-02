import React from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../../context/context";

interface Props {
  isVisible: boolean;
  fullScreenContent?: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  isVisible,
  children,
  onClose,
  fullScreenContent,
}) => {
  const { setSelectedTweet } = useAppContext();
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
          onClick={onClose}
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
              translateY: 20,
            }}
            className="modal-content"
            style={{
              maxHeight: fullScreenContent ? "100vh" : "90vh",
              width: fullScreenContent ? "100%" : undefined,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
