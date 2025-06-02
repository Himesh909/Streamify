import { ShipWheelIcon } from "lucide-react";

const Logo = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <ShipWheelIcon className="size-6 sm:size-9 text-primary" />
      <span className="text-xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
        Streamify
      </span>
    </div>
  );
};

export default Logo;
