import { IconPlayerPlay, IconHeart } from '@tabler/icons-react';
import { useMusic } from '@/features/player/context/useMusic';

export function HeroSection() {
    const { songs, playSong, toggleLike, isLiked } = useMusic();

    const featuredSong = songs && songs.length > 0 ? songs[0] : null;

    const handleListenNow = () => {
        if (featuredSong) {
            playSong(featuredSong, songs);
        }
    };

    if (!featuredSong) return null;

    const currentlyLiked = isLiked(featuredSong.id);

    return (
        <section className="relative rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <img
                src={featuredSong.cover}
                alt={featuredSong.title}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2 drop-shadow-md bg-black/20 self-start px-2 py-1 rounded-md backdrop-blur-sm">Featured Release</span>
                <h1 className="text-4xl md:text-6xl font-black mb-2 drop-shadow-lg text-white">
                    {featuredSong.title}
                </h1>
                <p className="text-gray-300 max-w-md mb-6 line-clamp-1 drop-shadow-md text-lg font-medium">
                    by {featuredSong.artist}
                </p>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleListenNow}
                        className="bg-white text-black px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
                    >
                        <IconPlayerPlay size={20} fill="currentColor" />
                        <span>Listen Now</span>
                    </button>
                    <button
                        onClick={() => toggleLike(featuredSong)}
                        className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${currentlyLiked ? 'bg-purple-500/30 text-purple-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        <IconHeart size={20} className={currentlyLiked ? 'fill-current' : ''} />
                    </button>
                </div>
            </div>
        </section>
    );
}
