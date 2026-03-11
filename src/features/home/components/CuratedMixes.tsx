import type { Mix } from '@/types';

interface CuratedMixesProps {
    mixes: Mix[];
}

export function CuratedMixes({ mixes }: CuratedMixesProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Curated for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mixes.map((mix) => (
                    <div key={mix.id} className="relative rounded-2xl p-6 h-48 overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all">
                        <div className={`absolute inset-0 bg-linear-to-r ${mix.colors} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full bg-black/10 blur-lg"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold text-white drop-shadow-md">{mix.title}</h3>
                            <p className="text-sm text-white/80 drop-shadow-sm font-medium">{mix.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
