import { faker } from "@faker-js/faker";
import { GoAlertFill, GoSync, GoXCircleFill } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

export default function PhotosListItem({ photo }) {
  const [removePhoto, result] = useRemovePhotoMutation();
  const handlePhotoDeleteClick = () => {
    removePhoto(photo);
  };

  let icon;
  if (result.isLoading) {
    icon = (
      <GoSync className="absolute top-2 right-2 text-black bg-white border-2 rounded-full font-bold text-lg animate-spin" />
    );
  } else if (result.isError) {
    icon = (
      <GoAlertFill className="absolute top-2 right-2 text-red-500 font-bold text-lg animate-pulse" />
    );
  } else {
    icon = (
      <GoXCircleFill
        onClick={handlePhotoDeleteClick}
        className="absolute top-2 right-2 text-white bg-black border-2 rounded-full font-bold text-xl hover:text-red-500 cursor-pointer"
      />
    );
  }

  return (
    <div className="m-3 relative">
      <img
        src={photo.url}
        alt={faker.commerce.productName()}
        className="border w-64 border-black rounded shadow"
      />
      {icon}
    </div>
  );
}
