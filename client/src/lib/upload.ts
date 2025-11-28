type UploadResult = {
  url: string;
  publicId: string;
  bytes?: number;
  format?: string;
};

export async function uploadFileToCloudinary(file: File, folder?: string): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  const query = folder ? `?folder=${encodeURIComponent(folder)}` : "";
  const response = await fetch(`/api/upload${query}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to upload file");
  }

  return response.json();
}

