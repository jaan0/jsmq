import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { uploadFileToCloudinary } from '@/lib/upload';
import AdminLayout from '@/components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Edit } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
}

type ProjectFormData = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
};

export default function AdminPortfolio() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { data: projects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ['/api/portfolio'],
  });

  const resetForm = () => {
    setFormData({ title: '', category: '', description: '', imageUrl: '', projectUrl: '' });
  };

  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      return apiRequest('POST', '/api/portfolio', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      setIsAddDialogOpen(false);
      resetForm();
      toast({ title: 'Project Created', description: 'Portfolio project has been added successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create project', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProjectFormData }) => {
      return apiRequest('PUT', `/api/portfolio/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      setEditingProject(null);
      resetForm();
      toast({ title: 'Project Updated', description: 'Portfolio project has been updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update project', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: 'Project Deleted', description: 'Portfolio project has been removed successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' });
    },
  });

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const result = await uploadFileToCloudinary(file, 'portfolio');
      setFormData((prev) => ({ ...prev, imageUrl: result.url }));
      toast({ title: 'Image uploaded', description: 'Image successfully uploaded to Cloudinary.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Upload failed', description: 'Unable to upload image. Please try again.', variant: 'destructive' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingProject(null);
      setIsAddDialogOpen(false);
      resetForm();
    } else if (!editingProject) {
      setIsAddDialogOpen(true);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Portfolio Management</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Dialog open={isAddDialogOpen || !!editingProject} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" data-testid="button-add-project">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="E-Commerce, Corporate, etc."
                    required
                    data-testid="input-category"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    data-testid="input-description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project URL (Optional)</Label>
                  <Input
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://example.com"
                    type="url"
                    data-testid="input-project-url"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add a link to the live project or demo.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Project Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    data-testid="input-project-file"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a screenshot or cover image for this project.
                  </p>
                  {formData.imageUrl && (
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <img
                        src={formData.imageUrl}
                        alt="Project preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending || updateMutation.isPending || isUploadingImage || !formData.imageUrl}
                  data-testid="button-submit-project"
                >
                  {(createMutation.isPending || updateMutation.isPending || isUploadingImage)
                    ? 'Saving...'
                    : editingProject ? 'Update Project' : 'Create Project'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-primary mb-2">{project.category}</p>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      data-testid={`button-edit-${project.id}`}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(project.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${project.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center text-muted-foreground">
            No projects yet. Add your first portfolio project.
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
