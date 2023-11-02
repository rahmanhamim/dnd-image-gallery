import { useState } from "react";
import "./App.css";
import HeaderBlock from "./components/Header/_HeaderBlock";
import { initialImageData } from "./data";
import ImageCard from "./components/Cards/ImageCard";
import { IImageGallery } from "./types/global.types";
// import AddImageCard from "./components/Cards/AddImageCard";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import ImageOverlayCard from "./components/Cards/ImageOverlayCard";
import AddImageCard from "./components/Cards/AddImageCard";

function App() {
  const [galleryData, setGalleryData] = useState(initialImageData);

  const handleSelectImage = (id: string | number) => {
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

  // DND KIT CODE STARTS HERE
  const [activeItem, setActiveItem] = useState<IImageGallery | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;

    if (!id) return;

    const currentItem = galleryData.find((item) => item.id === id);

    setActiveItem(currentItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setGalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y">
          <HeaderBlock onDelete={handleOnDelete} galleryData={galleryData} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // onDragOver={(event) => console.log("drag over", event)}
          >
            <div className="grid grid-cols-5 gap-8 p-8">
              <SortableContext
                items={galleryData}
                strategy={rectSortingStrategy}
              >
                {galleryData.map((imageItem, index) => {
                  return (
                    <ImageCard
                      className={index === 0 ? "row-span-2 col-span-2" : ""}
                      key={imageItem.id}
                      id={imageItem.id}
                      isFeatured={imageItem.isFeatured}
                      isSelected={imageItem.isSelected}
                      slug={imageItem.slug}
                      onClick={handleSelectImage}
                    />
                  );
                })}
              </SortableContext>
              <AddImageCard />

              <DragOverlay>
                {activeItem ? (
                  <ImageOverlayCard
                    className="absolute z-50 h-full w-full"
                    slug={activeItem.slug}
                  />
                ) : null}
              </DragOverlay>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;

/* <div className="grid grid-cols-5 gap-8 p-8">
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
          
          
          
          
          
           <ImageCard
                      className={index === 0 ? "row-span-2 col-span-2" : ""}
                      key={item.id}
                      id={item.id}
                      isSelected={item.isSelected}
                      slug={item.slug}
                      onClick={handleSelectImage}
                      isFeatured={item.isFeatured}
                    />
          
          
          
          */
