import { Artwork } from "../src/types";

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
    const res = await fetch(`${BASE_URL}?page=${page}`);
    if (!res.ok) {
        throw new Error("Failed to fetch artworks");
    }
    return res.json();
};