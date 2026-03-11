import { IconX, IconMusic } from '@tabler/icons-react';
import type { Song } from '@/types';
import { useQueuePanel } from '../hooks/useQueuePanel';
import { NowPlayingRow } from './queue/NowPlayingRow';
import { QueueRow } from './queue/QueueRow';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface QueuePanelProps {
    queue: Song[];
    currentSong: Song | null;
    isPlaying: boolean;
    onClose: () => void;
    onPlaySong: (song: Song, queue: Song[]) => void;
}

export function QueuePanel({ queue, currentSong, isPlaying, onClose, onPlaySong }: QueuePanelProps) {
    const { panelRef, currentRef, upNext, played } = useQueuePanel(queue, currentSong, onClose);

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

            <div
                ref={panelRef}
                role="dialog"
                aria-label="Play queue"
                className="fixed bottom-24 right-4 md:right-8 z-50 w-full max-w-sm bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.6)] flex flex-col max-h-[60vh] animate-in slide-in-from-bottom-4 fade-in duration-200"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                    <div className="flex items-center space-x-2">
                        <IconMusic size={18} className="text-purple-400" />
                        <h3 className="font-bold text-white text-base">Queue</h3>
                        <span className="text-xs text-gray-400 bg-white/10 rounded-full px-2 py-0.5">
                            {queue.length} songs
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close queue"
                    >
                        <IconX size={18} />
                    </button>
                </div>

                <ScrollArea className="flex-1 py-2">
                    {queue.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <IconMusic size={32} className="mb-3 opacity-40" />
                            <p className="text-sm">Your queue is empty</p>
                        </div>
                    ) : (
                        <div className="pb-4">
                            {currentSong && (
                                <QueueSection label="Now Playing">
                                    <NowPlayingRow ref={currentRef} song={currentSong} isPlaying={isPlaying} />
                                </QueueSection>
                            )}

                            {upNext.length > 0 && (
                                <QueueSection label="Up Next">
                                    {upNext.map((song, idx) => (
                                        <QueueRow key={`${song.id}-${idx}`} song={song} onPlay={() => onPlaySong(song, queue)} />
                                    ))}
                                </QueueSection>
                            )}

                            {played.length > 0 && (
                                <QueueSection label="History">
                                    {played.map((song, idx) => (
                                        <QueueRow key={`${song.id}-${idx}`} song={song} dimmed onPlay={() => onPlaySong(song, queue)} />
                                    ))}
                                </QueueSection>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </>
    );
}

function QueueSection({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="px-3 mt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-2 mb-1">
                {label}
            </p>
            {children}
        </div>
    );
}
