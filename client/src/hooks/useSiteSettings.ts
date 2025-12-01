import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SiteSettings, UpdateSiteSettings } from "@shared/siteSettings.ts";

export function useSiteSettings() {
    return useQuery<SiteSettings | null>({
        queryKey: ["siteSettings"],
        queryFn: async () => {
            const response = await fetch("/api/site-settings");
            if (!response.ok) {
                throw new Error("Failed to fetch site settings");
            }
            return response.json();
        },
    });
}

export function useUpdateSiteSettings() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateSiteSettings) => {
            const response = await fetch("/api/site-settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to update site settings");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
        },
    });
}
