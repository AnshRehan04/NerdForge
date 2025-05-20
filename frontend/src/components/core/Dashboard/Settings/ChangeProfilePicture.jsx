import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { updateUserProfileImage } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import Img from "./../../../common/Img";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, JPG, or PNG)');
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.error('File size should be less than 2MB');
        return;
      }

      setProfileImage(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    if (!(profileImage instanceof File)) {
      toast.error("Please select a valid image file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      await dispatch(updateUserProfileImage(token, formData));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.log("Error during file upload: ", error.message);
      toast.error("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-[#E0E0E0] bg-[#FFFFFF] p-8 px-3 sm:px-12">
      <div className="flex items-center gap-x-4">
        <Img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover bg-[#FFA5A5]"
        />
        <div className="space-y-2">
          <p className="font-medium text-[#5A5A5A]">Change Profile Picture</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md py-2 px-5 font-semibold bg-[#7A7A7A] text-white hover:bg-[#9E9E9E] duration-300"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              customClasses="bg-[#FACC15] hover:bg-[#EAB308] text-[#111827]"
              disabled={loading || !profileImage}
            >
              {!loading && (
                <FiUpload className="text-lg" />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
