import { format } from "date-fns";
import z from "zod";
import { logSchema } from ".";
interface CompletedFormProps {
  data: z.infer<typeof logSchema>;
}

const CompletedForm = ({ data }: CompletedFormProps) => {
  return (
    <div className="grid gap-y-4">
      {/* Date & Time Row */}
      <div className="flex flex-row items-center justify-center gap-x-3">
        {/* Date */}

        <div className="flex-1">
          <h1 className="font-bold">Session Ended: </h1>
          {format(data.sessionDateEnded, "PPP")} {data.sessionHourEnded}
        </div>
      </div>

      {/* Title */}
      <div>
        <div className="flex-1">
          <h1 className="font-bold">Title: </h1>
          {data.title}
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex-1">
          <h1 className="font-bold">Content: </h1>
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default CompletedForm;
