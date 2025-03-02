import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function ImportButton() {
    // TODO : just take the user slide info in json and add it to database
    return (
        <Button variant={'secondary'} className="rounded-lg">
            <Upload />
            <span>Import</span>
        </Button>
    );
}
