import type { Artwork } from "../src/types";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export interface ApiResponse {
    data: Artwork[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        current_page: number;
    };
}

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
    const url = `${BASE_URL}?page=${page}&limit=10&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch artworks");
    }

    return res.json();
};