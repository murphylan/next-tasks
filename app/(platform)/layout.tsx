import { Toaster } from "sonner";
import { Navbar } from "./_components/navbar";

const PlatFormLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default PlatFormLayout;
