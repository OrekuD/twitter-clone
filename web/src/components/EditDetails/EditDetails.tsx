import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppContext } from "../../context/context";
import {
  useAddProfileImageMutation,
  useAddUserDetailsMutation,
  useAddHeaderImageMutation,
} from "../../generated/graphql";
import { reshapeError } from "../../utils/reshapeError";
import { Cancel, ImageUploadIcon } from "../../Svgs";
import "./EditDetails.scss";
import Modal from "../Modal/Modal";
import { blue } from "../../constants/colors";
import Textarea from "react-textarea-autosize";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  bio: Yup.string().max(160, "Bio cannot exceed 160 characters"),
  location: Yup.string().max(30, "Location cannot exceed 30 characters"),
  fullname: Yup.string().max(50, "Fullname cannot exceed 50 characters"),
});

const maxChars = {
  fullname: 50,
  email: 50,
  bio: 160,
  location: 30,
};

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDetails = ({ isVisible, setIsVisible }: Props) => {
  const { userDetails } = useAppContext();
  const [, editDetails] = useAddUserDetailsMutation();
  const [, uploadProfileImage] = useAddProfileImageMutation();
  const [, uploadHeaderImage] = useAddHeaderImageMutation();
  const [profileImage, setProfileImage] = useState();
  const [headerImage, setHeaderImage] = useState();

  const initialValues = {
    bio: userDetails?.bio,
    location: userDetails?.location,
    fullname: userDetails?.fullname,
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values: { bio, fullname, location },
  } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setErrors }) => {
      const res = await editDetails({
        bio: values.bio!,
        fullname: values.fullname!,
        location: values.location!,
      });

      if (profileImage) {
        await uploadProfileImage({
          image: profileImage,
        });
      }

      if (headerImage) {
        const res = await uploadHeaderImage({
          image: headerImage,
        });
        console.log(res);
      }

      if (res.data?.addUserDetails.error) {
        setErrors(reshapeError(res.data?.addUserDetails.error));
      }
      if (!res.data?.addUserDetails.error) {
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => {
        setIsVisible(false);
      }}
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="edit-details">
          <div className="modal-header">
            <button
              className="icon-wrapper"
              onClick={() => setIsVisible(false)}
            >
              <Cancel size={24} color={blue} />
            </button>
            <p className="edit-details-title">Edit profile</p>
            <button className="ripple-btn" type="submit">
              Save
            </button>
          </div>
          <div className="edit-details-form">
            <label htmlFor="header-image-upload">
              <div className="header-image-upload">
                <img
                  src={`${PROFILE_IMAGES_BASE_URL + userDetails?.headerImage}`}
                  alt="profile-header"
                />
                <div className="upload-icon">
                  <ImageUploadIcon size={26} color="#fff" />
                </div>
              </div>
            </label>
            <input
              accept="image/*"
              type="file"
              id="header-image-upload"
              onChange={async (e) => {
                setHeaderImage(e.target.files![0] as any);
              }}
            />
            <label htmlFor="profile-image-upload">
              <div className="profile-image-upload">
                <img
                  src={`${PROFILE_IMAGES_BASE_URL + userDetails?.profileImage}`}
                  alt="profile-header"
                  className="profile-image"
                />
                <div className="upload-icon">
                  <ImageUploadIcon size={26} color="#fff" />
                </div>
              </div>
            </label>
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              onChange={async (e) => {
                setProfileImage(e.target.files![0] as any);
              }}
            />
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="fullname">Fullname</label>
                <input
                  value={fullname}
                  name="fullname"
                  onChange={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                />
              </div>
              <p className="count">
                {fullname?.length}/{maxChars.fullname}
              </p>
            </div>
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="location">Location</label>
                <input
                  value={location}
                  name="location"
                  onChange={handleChange("location")}
                  onBlur={handleBlur("location")}
                />
              </div>
              <p className="count">
                {location?.length}/{maxChars.location}
              </p>
            </div>
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="bio">Bio</label>
                <Textarea
                  type="text"
                  value={bio}
                  className="bio-textarea"
                  onChange={handleChange("bio")}
                  onBlur={handleBlur("bio")}
                />
              </div>
              <p className="count">
                {bio?.length}/{maxChars.bio}
              </p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditDetails;
