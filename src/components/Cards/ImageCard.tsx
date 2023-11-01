import { IImageGallery } from "../../types/global.types";
import { twMerge } from "tailwind-merge";
import CheckboxIcon from "../Icons/CheckboxIcon";
import EmptyCheckboxIcon from "../Icons/EmptyCheckboxIcon";

interface IImageCard extends IImageGallery {
  className?: string;
  onClick?: (id: string) => void;
}

const ImageCard = ({
  id,
  slug,
  isSelected,
  className = "",
  onClick,
}: IImageCard) => {
  return (
    <div
      className={twMerge(
        "relative rounded-lg overflow-hidden border group",
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
          "absolute top-2 left-2 group-hover:opacity-100 transition-opacity duration-500",
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
  );
};

export default ImageCard;
