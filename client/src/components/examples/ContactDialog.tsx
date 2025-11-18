import { useState } from 'react';
import ContactDialog from '../ContactDialog';
import { Button } from '@/components/ui/button';

export default function ContactDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Contact Dialog</Button>
      <ContactDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
