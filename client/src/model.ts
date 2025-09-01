export interface Track {
    id: number;
    file: string;
    isPlaying: boolean;
    name: string;
}

export interface User {
    id: number;
    username: string; 
    email: string;
    bio?: string;
    public: boolean;
    createdAt: Date;
    tracksCreated: Track[];
}