"use client";

import { useState, createRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

import { API_URL, RECAPTCHA_SITE_KEY } from "@/conf/keys";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email({
      message: "Email must be a valid email.",
    }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters.",
    })
    .max(1024, {
      message: "Message must be less than 1024 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [disabled, setDisabled] = useState(true);
  const recaptchaRef = createRef<ReCAPTCHA>();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const response = await fetch(`${API_URL}/contacts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    // set disabled
    setDisabled(true);
    // Rest form
    form.reset();
    // Show toast
    toast.success("Thank you for your message!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" className="h-48" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onExpired={() => setDisabled(true)}
          onChange={() => setDisabled(false)}
        />
        <Button type="submit" className="col-span-2" disabled={disabled}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
