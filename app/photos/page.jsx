import PhotoGrid from "../components/PhotoGrid";
import Nav from "../components/Nav";
import PhotoUploader from "../components/PhotoUploader";
import SignOutButton from "../components/SignOutButton";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default async function Photos() {
    // Fetch photos from the backend API route
    const res = await fetch(`api/get-photos`, { cache: 'no-store' });
    const photos = await res.json();

    return (
        <Provider store={store}>
            <main className="min-h-screen bg-gray-800 text-white relative p-10">
                <Nav />
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-4xl font-bold mb-4">Photos</h1>
                        <PhotoUploader />
                    </div>
                    <PhotoGrid initialPhotos={photos} />
                </div>
                <div className="absolute top-4 right-4">
                    <SignOutButton />
                </div>
            </main>
        </Provider>
    )
}
