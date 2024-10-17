import PhotoGrid from "../components/PhotoGrid";
import Nav from "../components/Nav";
import PhotoUploader from "../components/PhotoUploader";
import SignOutButton from "../components/SignOutButton";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export async function getServerSideProps() {
    const response = await fetch(`api/get-photos`);
    const photos = await response.json();

    return {
        props: {
            initialPhotos: photos,
        },
    };
}

export default function Photos({ initialPhotos }) {
    return (
        <Provider store={store}>
            <main className="min-h-screen bg-gray-800 text-white relative p-10">
                <Nav />
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="text-4xl font-bold mb-4">Photos</h1>
                        <PhotoUploader />
                    </div>
                    <PhotoGrid initialPhotos={initialPhotos} />
                </div>
                <div className="absolute top-4 right-4">
                    <SignOutButton />
                </div>
            </main>
        </Provider>
    )
}
