import { faker } from "@faker-js/faker";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

export default function PhotosList({ album }) {
  const { data, isError, isLoading } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const handleAddPhotoClick = () => {
    addPhoto({ url: faker.image.url(), albumId: album.id });
  };

  let content;

  if (isError) {
    content = <p>Error Loading photos</p>;
  } else if (isLoading) {
    content = <Skeleton className="w-64 h-52 m-3" times={5} />;
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div className="">
      <div className="flex items-center flex-row justify-between border-b p-2">
        <h6 className="font-bold"> Photos of {album.title}</h6>
        <Button loading={results.isLoading} onClick={handleAddPhotoClick}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-wrap justify-start">{content}</div>
    </div>
  );
}
