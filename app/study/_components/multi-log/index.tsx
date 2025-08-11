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
import { CircleCheck } from "lucide-react";
import CompletedForm from "./completed-form";
import { useCookies } from "next-client-cookies";

interface MultiLogProps {
  totalSteps: number;
}

export const logSchema = z.object({
  title: z.string().min(1, { message: "Title needs to be provided" }),
  content: z.string().min(1, { message: "Content needs to be provided" }),
  sessionDateEnded: z.date(),
  sessionHourEnded: z
    .string()
    .min(1, { message: "Need to provide when your session ended" }),
});

const MultiLog = ({ totalSteps }: MultiLogProps) => {
  const [step, setStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepData, setStepData] = useState<
    Record<number, z.infer<typeof logSchema>>
  >({});

  const form = useForm<z.infer<typeof logSchema>>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      title: "",
      content: "",
      sessionDateEnded: new Date(),
      sessionHourEnded: "",
    },
  });
  const cookies = useCookies();
  const onSubmit = async (formData: z.infer<typeof logSchema>) => {
    try {
      // Process form data
      const d = DateTime.fromISO(
        `${format(formData.sessionDateEnded, "yyyy-MM-dd")}T${formData.sessionHourEnded}`,
        { zone: "America/Los_Angeles" },
      );

      const convertedUTC = d.toUTC().toISO();
      console.log(convertedUTC);
      // formData.sessionHourEnded = convertedUTC || "";

      // Mark current step as completed
      setCompletedSteps((prev) => {
        const newSet = new Set(prev);
        newSet.add(step);
        return newSet;
      });

      setStepData((prev) => ({
        ...prev,
        [step]: formData,
      }));

      form.reset();

      const pomosCookie = cookies.get("pomosCompleted");
      const pomosCompleted = pomosCookie ? parseInt(pomosCookie) : 0;
      if (pomosCompleted > 0) {
        cookies.set("pomosCompleted", pomosCompleted - 1 + "");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleStep = (direction: "next" | "prev") => {
    if (direction === "next" && step < totalSteps - 1) {
      setStep(step + 1);
    } else if (direction === "prev" && step > 0) {
      setStep(step - 1);
    }
    form.reset();
  };

  const isStepComplete = (stepIndex: number) => completedSteps.has(stepIndex);

  return (
    <div className="space-y-4 m-4">
      {/* Progress indicator */}
      <div className="flex items-center justify-center min-h-full">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-6 h-6 rounded-full transition-all duration-300 ease-in-out text-black flex items-center justify-center",
                isStepComplete(index)
                  ? "bg-green-500"
                  : index === step
                    ? "bg-primary"
                    : "bg-primary/30",
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  isStepComplete(index) ? "bg-green-500" : "bg-primary/30",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="flex items-center justify-center">
        <Card className="bg-slate-800 [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.white)_86%,_theme(colors.white)_90%,_theme(colors.white)_94%,_theme(colors.slate.600/.48))_border-box] animate-border border border-transparent w-[50vw] drop-shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl flex flex-row items-center justify-center gap-x-2">
              {isStepComplete(step) && (
                <div className="animate-fade-in-right duration-300 text-green-600">
                  <CircleCheck />
                </div>
              )}
              Pomo Session {step + 1}{" "}
              {isStepComplete(step) && <span>logged</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            {completedSteps.has(step) ? (
              <CompletedForm data={stepData[step]} />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-y-4"
                  id="add-log"
                >
                  <RenderFormFields control={form.control} />
                </form>
              </Form>
            )}

            <div className="flex justify-between my-3">
              <Button
                type="button"
                className="font-medium"
                size="sm"
                onClick={handleBack}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                type="submit"
                form="add-log"
                disabled={completedSteps.has(step)}
              >
                Add Log
              </Button>
              <Button
                type="button"
                size="sm"
                className="font-medium"
                onClick={() => handleStep("next")}
                disabled={step === totalSteps - 1 || !isStepComplete(step)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiLog;
