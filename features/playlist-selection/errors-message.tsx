import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { errorsAtom } from "@/state/music-quizz";
import { useAtom } from "jotai";
import { AlertCircle, X } from "lucide-react";

const ErrorMessages = () => {
  const [errors, setErrors] = useAtom(errorsAtom);

  if (!errors) return null;

  return (
    <div className="flex flex-col gap-4">
      {errors.map((err) => (
        <Alert key={err.message} variant={err.type} className="pr-11 relative">
          <AlertCircle className="h-4 w-4" />

          <span>{err.message}</span>

          <div>
            <Button
              variant={"ghost"}
              color={err.type === "destructive" ? "red" : undefined}
              size={"icon"}
              className="absolute right-0 top-0"
              onClick={() => setErrors((e) => e.filter((e) => e !== err))}
            >
              {<X />}
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default ErrorMessages;
