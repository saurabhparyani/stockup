import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );
};

export default Spinner;
