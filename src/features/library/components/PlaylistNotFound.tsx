import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';

export function PlaylistNotFound() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center justify-center py-20 animate-in fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Playlist not found</h2>
            <button
                onClick={() => navigate({ to: '/' })}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center space-x-2 text-white"
            >
                <IconArrowLeft size={18} />
                <span>Back to Home</span>
            </button>
        </div>
    );
}