import React, { useState } from "react";
import { HiUser } from "react-icons/hi2";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { TextField } from "@mui/material";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useUpdateEntity } from "../hooks/useCustomeMutation";

const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75rem;
  margin-left: auto;
  margin-right: auto;
`;

const StyledIcon = styled(HiUser)`
  font-size: 15rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
  cursor: pointer;
  margin-bottom: 3rem;
`;

const EditIcon = styled(MdModeEditOutline)`
  font-size: 1.5rem;
  color: var(--color-primary);
  cursor: pointer;
`;

const StyledField = styled(TextField)`
  width: 350px;
`;

const CameraIcon = styled.div`
  font-size: 3rem;
  cursor: pointer;
`;

function Account() {
  const { isLoading, user } = useUser();

  const { updateEntity: updateProfile } = useUpdateEntity({
    method: "patch",
    endpoint: "/users/update-me",
    mutationKey: "[update-profile]",
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update Profile",
    invalidateQueries: "current-user",
    redirectPath: "",
  });

  if (isLoading) return <Spinner />;
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();
  const [editedData, setEditedData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address || "",
    phone: user?.phone || "",
    avatar: user?.avatar,
  });

  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      console.log(file);
      setSelectedImage(URL.createObjectURL(file));
    }
    event.target.value = null;
  };

  const handleUpdate = () => {
    const formData = new FormData();
    for (const key in editedData) {
      formData.append(key, editedData[key]);
    }
    formData.append("image", file);

    updateProfile("1000000", formData);
  };

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <StyledUser>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      ) : editedData.avatar ? (
        <img
          src={editedData.avatar}
          alt="Avatar"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      ) : (
        <StyledIcon onClick={handleUpload} />
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <CameraIcon onClick={handleUpload}>📷</CameraIcon>
      <Row>
        <Row type="horizontal">
          <StyledField
            value={editedData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            variant="outlined"
            label="First Name"
            InputLabelProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <StyledField
            value={editedData.lastName}
            variant="outlined"
            label="Last Name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
        </Row>
        <Row type="horizontal">
          <StyledField
            value={editedData.email}
            variant="outlined"
            label="Email"
            onChange={(e) => handleChange("email", e.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <StyledField
            value={editedData?.address}
            variant="outlined"
            label="Address"
            onChange={(e) => handleChange("address", e.target.value)}
            InputLabelProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
        </Row>

        <Row type="horizontal">
          <StyledField
            value={editedData?.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            label="Phone number"
            variant="outlined"
            InputLabelProps={{ style: { fontSize: 14 } }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />

          <Button size="large" onClick={handleUpdate}>
            Save
          </Button>
        </Row>
      </Row>
    </StyledUser>
  );
}

export default Account;
