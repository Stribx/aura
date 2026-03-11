import { IconPlayerPlay } from '@tabler/icons-react';

interface Album {
    id: string;
    title: string;
    artist: string;
    cover: string;
    year: string;
}

interface Props {
    albums: Album[];
}

export function AlbumsTab({ albums }: Props) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Saved Albums</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.map((album) => (
                    <div key={album.id} className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all cursor-pointer hover:-translate-y-2">
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-lg shadow-black/40">
                            <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transition-all transform -translate-x-1/2 mt-4 group-hover:-translate-y-1/2 z-10">
                                <IconPlayerPlay size={24} className="text-black ml-1" fill="currentColor" />
                            </div>
                        </div>
                        <h4 className="font-bold text-base mb-1 truncate text-white">{album.title}</h4>
                        <p className="text-sm text-gray-400 truncate">{album.artist} • {album.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}