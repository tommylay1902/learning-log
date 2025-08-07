"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface MultiLogProps {
  totalSteps: number;
}

interface FormData {
  title: string;
  content: string;
  sessionEnded: string;
  // TODO: impl selector for selecting the correct category
  // Add other fields as needed for each step
}

const MultiLog = ({ totalSteps }: MultiLogProps) => {
  const [step, setStep] = useState<number>(0);

  const form = useForm<FormData>();
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (formData: FormData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      setStep(0);
      reset();
      // toast.success("Form successfully submitted");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderFormFields = () => (
    <>
      <FormField
        name="sessionEnded"
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div>
              <FormLabel>Session Ended</FormLabel>
            </div>

            <div className="flex flex-row items-center justify-center justify-items-center gap-x-3">
              <div className="flex-1">
                {/*calendar component*/}
                <Label htmlFor="date-picker" className="px-1 block">
                  Date
                </Label>
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
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                      className=" rounded-lg w-full"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1">
                {/*time picker*/}
                <Label htmlFor="time-picker" className="px-1 block">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  placeholder="10:30:00"
                  className="w-full bg-inherit appearance-none focus-visible:ring-0 focus-visible:ring-offset-0
                  [&::-webkit-calendar-picker-indicator]:hidden
                  [&::-webkit-calendar-picker-indicator]:appearance-none border-b-white"
                />
                {/*TODO implement a now button that adds button with current time*/}
              </div>
            </div>
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
                className="!border-0 !border-b !border-b-white focus-visible:ring-0 focus-visible:ring-offset-0 text-center hover:bg-accent"
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
                className=" border-white hover:bg-accent"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );

  return (
    <div className="space-y-4 m-4">
      {/* Progress indicator */}
      <div className="flex items-center justify-center min-h-full">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-6 h-6 rounded-full transition-all duration-300 ease-in-out text-black",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary",
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < step ? "bg-primary" : "bg-primary/30",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="flex items-center justify-center">
        <Card
          className="bg-slate-800
          [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.white)_86%,_theme(colors.white)_90%,_theme(colors.white)_94%,_theme(colors.slate.600/.48))_border-box]
          animate-border border border-transparent w-[50vw]   drop-shadow-2xl"
        >
          <CardHeader>
            <CardTitle className="text-xl">Pomo Session {step + 1}</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                {renderFormFields()}

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiLog;
