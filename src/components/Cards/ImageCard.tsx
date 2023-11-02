import { IImageGallery } from "../../types/global.types";
import { twMerge } from "tailwind-merge";
import CheckboxIcon from "../Icons/CheckboxIcon";
import EmptyCheckboxIcon from "../Icons/EmptyCheckboxIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IImageCard extends IImageGallery {
  className?: string;
  onClick?: (id: string | number) => void;
}

const ImageCard = ({
  id,
  slug,
  isSelected,
  className = "",
  onClick,
}: IImageCard) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={twMerge(
        "relative rounded-lg overflow-hidden border border-gray-300 group z-0",
        className,
        isSelected && "opacity-60"
      )}
    >
      <button
        {...listeners}
        {...attributes}
        className={twMerge(
          "absolute inset-0 bg-black transition-opacity duration-500 opacity-0 group-hover:opacity-20",
          isSelected && "!opacity-0"
        )}
      >
        Drag handle
      </button>
      <button
        className={twMerge(
          "absolute top-2 z-50 left-2 group-hover:opacity-100 transition-opacity duration-500",
          isSelected && "!opacity-100",
          !isSelected && "opacity-0"
        )}
        onClick={onClick && (() => onClick(id))}
      >
        {isSelected ? (
          <CheckboxIcon className="" />
        ) : (
          <EmptyCheckboxIcon className="" />
        )}
      </button>
      <div>
        <img src={slug} alt={slug} className="block" />
      </div>
    </div>
  );
};

export default ImageCard;

/* 
div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={twMerge(
        "relative rounded-lg overflow-hidden border border-gray-300 group z-0",
        className,
        isSelected && "opacity-60"
      )}
    >
      <div
        className={twMerge(
          "absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-20",
          isSelected && "!opacity-0"
        )}
      />

      <button
        className={twMerge(
          "absolute top-2 z-50 left-2 group-hover:opacity-100 transition-opacity duration-500",
          isSelected && "!opacity-100",
          !isSelected && "opacity-0"
        )}
        onClick={onClick && (() => onClick(id))}
      >
        {isSelected ? (
          <CheckboxIcon className="" />
        ) : (
          <EmptyCheckboxIcon className="" />
        )}
      </button>
      <img src={slug} alt={slug} className="block" />
    </div>


*/
