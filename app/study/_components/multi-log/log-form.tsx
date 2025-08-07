"use client";
import React from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
// import { DateTimePicker } from "./date-time-picker";

// interface FormData {
//   title: string;
//   content: string;
//   sessionEnded: string;
//   // TODO: impl selector for selecting the correct category
//   // Add other fields as needed for each step
// }

const renderFormFields = (control: Control<FieldValues>) => (
  <>
    <FormField
      name="sessionEnded"
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
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
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Title"
              autoComplete="off"
              className="!border-0 !border-b !border-b-white focus-visible:ring-0 focus-visible:ring-offset-0 text-center"
            />
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Build out some forms in shadcn..."
              autoComplete="off"
              className="bg-transparent border-white"
            />
          </FormControl>
        </FormItem>
      )}
    />
  </>
);

interface LogFormProps {
  step: number;
  handleStep: (stepChange: 1 | -1) => void;
  totalSteps: number;
}

export function LogForm<T extends FieldValues>({
  step,
  handleStep,
  totalSteps,
}: LogFormProps) {
  const form = useForm<T>();
  const { handleSubmit, control, reset } = form;

  const handleBack = () => {
    if (step > 0) {
      handleStep(-1);
    }
  };

  const onSubmit = async (formData: T) => {
    if (step < totalSteps - 1) {
      handleStep(1);
    } else {
      console.log(formData);
      // setStep(0);
      reset();
      // toast.success("Form successfully submitted");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
        {renderFormFields(control as Control<FieldValues>)}

        <div className="flex justify-between">
          <Button
            type="button"
            className="font-medium"
            size="sm"
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button type="submit" size="sm" className="font-medium">
            {step === totalSteps - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LogForm;
