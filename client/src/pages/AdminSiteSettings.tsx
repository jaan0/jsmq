import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings.ts";
import AdminLayout from "@/components/AdminLayout.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { Loader2, Save, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { updateSiteSettingsSchema } from "@shared/siteSettings.ts";

type FormData = z.infer<typeof updateSiteSettingsSchema>;

export default function AdminSiteSettings() {
  const { data: settings, isLoading, error: fetchError } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");

  const form = useForm<FormData>({
    resolver: zodResolver(updateSiteSettingsSchema),
    defaultValues: {
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      companyName: "",
      footerTagline: "",
      socialLinks: [],
      privacyPolicy: "",
      termsOfService: "",
      cookiePolicy: "",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching settings:", fetchError);
      toast({
        title: "Error",
        description: "Failed to load site settings.",
        variant: "destructive",
      });
    }
  }, [fetchError, toast]);

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form data:", data);
    try {
      await updateSettings.mutateAsync(data);
      console.log("Settings updated successfully");
      toast({
        title: "Settings Updated",
        description: "Site settings have been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onInvalid = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please check the form for errors.",
      variant: "destructive",
    });
  };

  const socialPlatforms = [
    { name: "facebook", icon: Facebook, label: "Facebook" },
    { name: "twitter", icon: Twitter, label: "Twitter" },
    { name: "instagram", icon: Instagram, label: "Instagram" },
    { name: "linkedin", icon: Linkedin, label: "LinkedIn" },
    { name: "github", icon: Github, label: "GitHub" },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Site Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your site's contact information, social links, and legal content
            </p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your site's contact information, social links, and legal content
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                <TabsTrigger value="social">Social Links</TabsTrigger>
                <TabsTrigger value="legal">Legal Content</TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Update your business contact details displayed in the footer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="contact@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+1 (555) 123-4567" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} placeholder="123 Business St" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="JSMQ" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="footerTagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Footer Tagline</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={2} placeholder="Creating exceptional digital experiences..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>
                      Add your social media URLs and control their visibility. Leave URL empty if not used.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {socialPlatforms.map((platform, index) => {
                      const Icon = platform.icon;
                      return (
                        <div key={platform.name} className="space-y-3 p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-purple-600" />
                            <h3 className="font-medium">{platform.label}</h3>
                          </div>
                          <FormField
                            control={form.control}
                            name={`socialLinks.${index}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value || ""}
                                    placeholder={`https://${platform.name}.com/yourprofile`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`socialLinks.${index}.visible`}
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between">
                                <div>
                                  <FormLabel>Show in Footer</FormLabel>
                                  <FormDescription>Display this social link on your website</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          {/* Hidden field to ensure platform name is sent */}
                          <input type="hidden" {...form.register(`socialLinks.${index}.platform`)} value={platform.name} />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="legal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Policy</CardTitle>
                    <CardDescription>Content for your privacy policy page (Markdown + HTML supported)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="privacyPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea {...field} rows={15} placeholder="# Privacy Policy" className="font-mono text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Terms of Service</CardTitle>
                    <CardDescription>Content for your terms of service page (Markdown + HTML supported)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="termsOfService"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea {...field} rows={15} placeholder="# Terms of Service" className="font-mono text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Cookie Policy</CardTitle>
                    <CardDescription>Content for your cookie policy page (Markdown + HTML supported)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="cookiePolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea {...field} rows={15} placeholder="# Cookie Policy" className="font-mono text-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end sticky bottom-6 bg-background/80 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
              <Button
                type="submit"
                disabled={updateSettings.isPending}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-[150px]"
              >
                {updateSettings.isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
