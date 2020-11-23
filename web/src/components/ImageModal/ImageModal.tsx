import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import Modal from "../Modal/Modal";
import "./ImageModal.scss";

const ImageModal = () => {
  const {
    currentModal,
    selectedImageDetails,
    setCurrentModal,
  } = useAppContext();

  if (!selectedImageDetails) return null;

  const { type, url } = selectedImageDetails;

  return (
    <Modal
      isVisible={
        currentModal === "HEADER_IMAGE" || currentModal === "PROFILE_IMAGE"
      }
      onClose={() => setCurrentModal(null)}
      fullScreenContent
    >
      <div className="image-modal" onClick={() => setCurrentModal(null)}>
        <button
          className="icon-wrapper close-image"
          onClick={() => setCurrentModal(null)}
        >
          <Cancel size={22} color="#fff" />
        </button>
        {type === "HEADER_IMAGE" ? (
          <img
            src={`${PROFILE_IMAGES_BASE_URL + url}`}
            alt="profile-header"
            className="cover-image"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={`${PROFILE_IMAGES_BASE_URL + url}`}
            alt="profile-header"
            className="profile-image"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
