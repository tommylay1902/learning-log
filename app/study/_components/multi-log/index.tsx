"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import RenderFormFields from "./render-form-fields";

interface MultiLogProps {
  totalSteps: number;
}

export const logSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  sessionDateEnded: z.date(),
  sessionHourEnded: z.string(),
});

const MultiLog = ({ totalSteps }: MultiLogProps) => {
  const [step, setStep] = useState<number>(0);

  const form = useForm<z.infer<typeof logSchema>>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      title: "",
      content: "",
      sessionDateEnded: new Date(),
      sessionHourEnded: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (formData: z.infer<typeof logSchema>) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      const d = DateTime.fromISO(
        `${format(formData.sessionDateEnded, "yyyy-MM-dd")}T${formData.sessionHourEnded}`,
        {
          zone: "America/Los_Angeles",
        },
      );

      const convertedUTC = d.toUTC().toISO();

      formData.sessionHourEnded = convertedUTC ? convertedUTC : "";
      console.log(formData);
      setStep(0);
      reset();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

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
                <RenderFormFields control={control} />

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
