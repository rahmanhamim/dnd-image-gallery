import { useState } from "react";
import "./App.css";
import HeaderBlock from "./components/Header/_HeaderBlock";
import { initialImageData } from "./data";
import ImageCard from "./components/Cards/ImageCard";
import { IImageGallery } from "./types/global.types";
import AddImageCard from "./components/Cards/AddImageCard";

function App() {
  const [galleryData, setGalleryData] = useState(initialImageData);

  const handleSelectImage = (id: string) => {
    // if galleryData.isSelected === true then set to false and vice versa
    const newGalleryData = galleryData.map((imageItem) => {
      if (imageItem.id === id) {
        return {
          ...imageItem,
          isSelected: !imageItem.isSelected,
        };
      }

      return imageItem;
    });

    setGalleryData(newGalleryData);
  };

  const handleOnDelete = (selectedItems: IImageGallery[]) => {
    // if galleryData.isSelected === true then filter out the selected items and return the rest
    const newGalleryData = galleryData.filter(
      (imageItem) => !selectedItems.includes(imageItem)
    );

    setGalleryData(newGalleryData);
  };

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y">
          <HeaderBlock onDelete={handleOnDelete} galleryData={galleryData} />
          <div className="grid grid-cols-5 gap-8 p-8">
            {galleryData.map((imageItem, index) => (
              <ImageCard
                className={index === 0 ? "row-span-2 col-span-2" : ""}
                key={imageItem.id}
                id={imageItem.id}
                isFeatured={imageItem.isFeatured}
                isSelected={imageItem.isSelected}
                slug={imageItem.slug}
                onClick={handleSelectImage}
              />
            ))}
            <AddImageCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
