import { Suspense } from 'react';
import NewProjectSkeleton from './_components/CreateProject/CreateProjectSkeleton';
import RenderPage from './_components/RenderPage';

export default function page() {
    return (
        <div className="w-full h-full">
            <Suspense fallback={<NewProjectSkeleton />}>
                <RenderPage />
            </Suspense>
        </div>
    );
}
