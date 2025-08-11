import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { logSchema } from ".";
import z from "zod";

interface RenderFormFieldsProps {
  control: Control<z.infer<typeof logSchema>>;
}

const RenderFormFields = ({ control }: RenderFormFieldsProps) => (
  <>
    <div className="flex flex-row items-center justify-center gap-x-3">
      <FormField
        name="sessionDateEnded"
        control={control}
        render={({ field }) => (
          <FormItem className="flex-1">
            {/*calendar component*/}
            <FormLabel htmlFor="date-picker" className="px-1">
              Date
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal bg-transparent border-b-white w-full",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-slate-800">
                <Calendar
                  id="date-picker"
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(date);
                    } else {
                      field.onChange(new Date());
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                  className=" rounded-lg w-full"
                />
              </PopoverContent>
            </Popover>
            <div className="min-h-[4vh]">
              <FormMessage className="text-red-600" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="sessionHourEnded"
        render={({ field }) => (
          <FormItem className="flex-1">
            {/*time picker*/}
            <FormLabel
              htmlFor="time-picker"
              className="px-1 block data-[error=true]:text-red-600 "
            >
              Time
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="time"
                id="time-picker"
                step="1"
                placeholder="10:30:00"
                className="w-full bg-inherit appearance-none focus-visible:ring-0 focus-visible:ring-offset-0
          [&::-webkit-calendar-picker-indicator]:hidden
          [&::-webkit-calendar-picker-indicator]:appearance-none border-b-white"
                onChange={field.onChange}
              />
            </FormControl>
            <div className="min-h-[4vh]">
              <FormMessage className="text-red-600" />
            </div>
            {/*TODO implement a now button that adds button with current time*/}
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="data-[error=true]:text-red-600">
            Title
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Title"
              autoComplete="off"
              className="!border-0 !border-b !border-b-white focus-visible:ring-0 focus-visible:ring-offset-0 text-center hover:bg-accent"
            />
          </FormControl>
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="data-[error=true]:text-red-600">
            Content
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Build out some forms in shadcn..."
              autoComplete="off"
              className=" border-white hover:bg-accent"
            />
          </FormControl>
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  </>
);

export default RenderFormFields;
