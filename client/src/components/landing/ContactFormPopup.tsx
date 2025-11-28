import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServices } from "@/hooks/useServices";
import { useCreateContactMessage } from "@/hooks/useContactMessages";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Send } from "lucide-react";

const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    service: z.string().min(1, "Please select a service"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedService?: string;
}

export default function ContactFormPopup({ isOpen, onClose, preSelectedService }: ContactFormPopupProps) {
    const [isSuccess, setIsSuccess] = useState(false);
    const { data: services } = useServices();
    const createMessage = useCreateContactMessage();
    const { toast } = useToast();

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            service: preSelectedService || "",
            message: "",
        },
    });

    // Update service when preSelectedService changes
    useState(() => {
        if (preSelectedService) {
            form.setValue("service", preSelectedService);
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            await createMessage.mutateAsync(data);
            setIsSuccess(true);
            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });

            // Reset form and close after 2 seconds
            setTimeout(() => {
                form.reset();
                setIsSuccess(false);
                onClose();
            }, 2000);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleClose = () => {
        form.reset();
        setIsSuccess(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700 text-white animate-scale-in">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Get In Touch</DialogTitle>
                    <DialogDescription className="text-white/70">
                        Fill out the form below and we'll get back to you within 24 hours.
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Message Sent Successfully!</h3>
                        <p className="text-white/70">We'll be in touch soon.</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                                className="bg-slate-800 border-slate-700 text-white placeholder:text-white/50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                {...field}
                                                className="bg-slate-800 border-slate-700 text-white placeholder:text-white/50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Service Field */}
                            <FormField
                                control={form.control}
                                name="service"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Service Interested In</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                                {services?.map((service) => (
                                                    <SelectItem key={service.id} value={service.title}>
                                                        {service.title}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Message Field */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about your project..."
                                                rows={4}
                                                {...field}
                                                className="bg-slate-800 border-slate-700 text-white placeholder:text-white/50 resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white glow-on-hover"
                                disabled={createMessage.isPending}
                            >
                                {createMessage.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
