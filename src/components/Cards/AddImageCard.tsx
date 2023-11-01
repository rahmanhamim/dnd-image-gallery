import { twMerge } from "tailwind-merge";
import ImageIcon from "../Icons/ImageIcon";

const AddImageCard = () => {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500"
      )}
    >
      <ImageIcon />
      <p className="font-semibold">Add Images</p>
    </div>
  );
};

export default AddImageCard;
