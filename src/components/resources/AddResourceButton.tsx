
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import AddResourceForm from "./AddResourceForm";

const AddResourceButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <FilePlus size={16} />
        Add Resource
      </Button>
      <AddResourceForm open={open} setOpen={setOpen} />
    </>
  );
};

export default AddResourceButton;
