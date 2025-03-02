import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SearchBox from './top-bar-search-box';
import ThemeSwitcher from './theme-switcher';
import ImportButton from './import-button';
import NewProjectButton from './new-project-button';

interface TopbarProps {
    children: React.ReactNode;
}

export default function Topbar({ }: TopbarProps) {
    return (
        <header className="sticky top-0 z-10 shrink-0 flex items-center flex-wrap gap-1 bg-background p-4 justify-between">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center justify-between gap-16 flex-wrap w-full">
                <SearchBox />
                <ThemeSwitcher />
                <div className="flex flex-wrap gap-4 items-center justify-end">
                    <ImportButton />
                    <NewProjectButton />
                </div>
            </div>
        </header>
    );
}
