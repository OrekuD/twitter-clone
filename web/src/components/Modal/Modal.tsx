import React from "react";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../../context/context";

interface Props {
  isVisible: boolean;
}

const Modal = ({ isVisible }: Props) => {
  const { setModalState } = useAppContext();
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
          onClick={() => setModalState(false)}
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
            <p>
              Occaecat sunt fugiat culpa cillum adipisicing ullamco magna veniam
              tempor mollit. Esse quis velit in amet aute reprehenderit dolor.
              Qui fugiat in dolor veniam. Qui in reprehenderit laborum ad
              nostrud reprehenderit enim enim esse ea est laboris. Esse deserunt
              nulla consectetur ea velit est mollit fugiat elit esse pariatur
              veniam commodo id. Dolor sunt et ad in consectetur laboris Lorem.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
