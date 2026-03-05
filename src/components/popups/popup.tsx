import "./popup.css";

interface PopupProps {
  imageSrc: string;
  alt?: string;
  onClose: () => void;
}

export default function Popup({ imageSrc, alt = "Popup image", onClose }: PopupProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <img src={imageSrc} alt={alt} className="popup-image" />

        <button className="popup-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
