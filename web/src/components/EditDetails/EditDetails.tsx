import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppContext } from "../../context/context";
import {
  useAddProfileImageMutation,
  useAddUserDetailsMutation,
} from "../../generated/graphql";
import { reshapeError } from "../../utils/reshapeError";
import { Cancel } from "../../Svgs";
import "./EditDetails.scss";
import Modal from "../Modal/Modal";
import { blue } from "../../constants/colors";

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
  const [, uploadImage] = useAddProfileImageMutation();
  const [profileImage, setProfileImage] = useState();

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
      // // This is to prevent empty values from being submitted when modal is dismissed
      // if (!values.bio && !values.fullname && !values.location) {
      //   return;
      // }
      const res = await editDetails({
        bio: values.bio!,
        fullname: values.fullname!,
        location: values.location!,
      });

      if (profileImage) {
        await uploadImage({
          image: profileImage,
        });
      }

      if (res.data?.addUserDetails.error) {
        setErrors(reshapeError(res.data?.addUserDetails.error));
      }
      if (!res.data?.addUserDetails.error) {
        setIsVisible(false);
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
            <input
              accept="image/*"
              type="file"
              onChange={async (e) => {
                setProfileImage(e.target.files![0] as any);
                // const res = await uploadImage({
                //   image: e.target.files![0],
                // });
                // console.log({ res });
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
                <textarea
                  value={bio}
                  name="bio"
                  draggable={false}
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
