import Photo from "./Photo";
import { cookies } from "next/headers";
import {createServerClient} from "@supabase/ssr";

async function fetchPhotosFromAPI() {
    try {
        const response = await fetch('api/get-photos');
        if (!response.ok) {
            throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        return data; // return the fetched photos data
    } catch (error) {
        console.error("Error fetching photos from API:", error);
        return [];
    }
}

async function fetchFavoritePhotos(user, supabaseServer) {
    const { data, error } = await supabaseServer
        .from('favorites')
        .select('photo_name')
        .eq('user_id', user.id);

    if (error) {
        console.error(`Error fetching favorites`, error);
        return [];
    }
    return data.map((favorite) => favorite.photo_name);
}

export default async function PhotoGrid({ favorites = false }) {
    const cookieStore = cookies();

    const supabaseServer = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                }
            }
        }
    );

    const { data: { user } } = await supabaseServer.auth.getUser();
    const photos = await fetchPhotosFromAPI(); // Fetch photos from the new API
    const favoritePhotoNames = await fetchFavoritePhotos(user, supabaseServer);

    // Prepare the displayed photos
    const photosWithFavorites = photos.map((photo) => ({
        id:photo.id,
        url: photo.url,
        photoName: photo.comment || "Untitled",
        isFavorited: favoritePhotoNames.includes(photo.comment), // Assuming comment is the photo name for favorites
        comments: photo.comment ? [{ comment_text: photo.comment }] : [] // You can adjust this based on your needs
    }));

    const displayedPhotos = favorites
        ? photosWithFavorites.filter(photo => photo.isFavorited)
        : photosWithFavorites;

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {displayedPhotos.map((photo) => (
                <div key={photo.photoName} className="flex flex-col items-center">
                    <Photo
                        id={photo.id}
                        src={photo.url}
                        alt={`Photo ${photo.photoName}`}
                        width={200}
                        height={200}
                        photoName={photo.photoName}
                        isFavorited={photo.isFavorited}
                    />
                    <div className="mt-2">
                        {photo.comments?.length > 0 ? (
                            <ul className="space-y-1">
                                {photo.comments.map((comment, index) => (
                                    <li key={index} className="text-gray-400">
                                        {comment.comment_text}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No comments yet.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
