import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { errorsAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { X } from "lucide-react";

const ErrorMessages = () => {
  const [errors, setErrors] = useAtom(errorsAtom);

  if (!errors) return null;
  return (
    <div className="flex flex-col gap-4">
      {errors.map((err) => (
        <Alert key={err.message} variant={err.type}>
          {err.message}
          <Button
            variant={"ghost"}
            color="red"
            size={"icon"}
            className="absolute right-0 top-0"
            onClick={() => setErrors([])}
          >
            {<X />}
          </Button>
        </Alert>
      ))}
    </div>
  );
};

export default ErrorMessages;
