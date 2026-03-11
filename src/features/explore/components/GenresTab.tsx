import { IconFlame, IconTrendingUp, IconPodium, IconMusic, IconPlanet, IconRipple } from '@tabler/icons-react';

interface GenresTabProps {
    onGenreClick: (genre: string) => void;
}

const genres = [
    { name: 'Pop Fusion', color: 'from-pink-500 to-rose-400', icon: IconFlame },
    { name: 'Midnight Lofi', color: 'from-blue-600 to-indigo-500', icon: IconPlanet },
    { name: 'Electronic', color: 'from-cyan-400 to-blue-500', icon: IconRipple },
    { name: 'Hip Hop', color: 'from-purple-600 to-fuchsia-500', icon: IconPodium },
    { name: 'Acoustic Chill', color: 'from-emerald-400 to-teal-500', icon: IconMusic },
    { name: 'Rock Classics', color: 'from-orange-500 to-red-500', icon: IconTrendingUp },
];

export function GenresTab({ onGenreClick }: GenresTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {genres.map((genre, i) => {
                    const Icon = genre.icon;
                    return (
                        <div
                            key={i}
                            onClick={() => onGenreClick(genre.name.split(' ')[0].toLowerCase())}
                            className={`relative overflow-hidden group rounded-2xl aspect-4/3 cursor-pointer transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-${genre.color.split('-')[1]}/20`}
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${genre.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    <Icon size={20} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white drop-shadow-md">{genre.name}</h3>
                            </div>

                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-[20px] group-hover:bg-white/20 transition-colors pointer-events-none"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
