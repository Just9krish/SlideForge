import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBox() {
    return (
        <div className="relative min-w-[60%] flex items-center border rounded-full bg-muted">
            <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute  left-0  h-full rounded-l-none bg-transparent hover:bg-transparent"
            >
                <Search className="size-4" />
                <span className="sr-only">search</span>
            </Button>
            <Input
                className="flex-grow ml-6 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search by title"
            />
        </div>
    );
}
