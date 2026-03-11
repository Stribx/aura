import { IconMicrophone2, IconPlaylist, IconVolume2, IconVolume3, IconVolume } from '@tabler/icons-react';
import { Slider } from '@/components/ui/Slider';

interface Props {
    isLyricsOpen: boolean;
    isQueueOpen: boolean;
    volume: number;
    onToggleLyrics: () => void;
    onToggleQueue: () => void;
    onToggleMute: () => void;
    onVolumeChange: (val: number) => void;
}

export function PlayerActions({
    isLyricsOpen, isQueueOpen, volume,
    onToggleLyrics, onToggleQueue, onToggleMute, onVolumeChange
}: Props) {
    return (
        <div className="hidden md:flex items-center justify-end w-1/4 space-x-4 text-gray-400">
            <button onClick={onToggleLyrics} aria-label="Toggle lyrics"
                className={`transition-colors flex items-center justify-center p-2 rounded-full ${isLyricsOpen ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:text-white'}`}>
                <IconMicrophone2 size={18} />
            </button>
            <button onClick={onToggleQueue} aria-label="Open queue" aria-expanded={isQueueOpen}
                className={`transition-colors flex items-center justify-center p-2 rounded-full ${isQueueOpen ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:text-white'}`}>
                <IconPlaylist size={18} />
            </button>

            <div className="flex items-center space-x-2 w-28 group/vol">
                <button onClick={onToggleMute} aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                    className="hover:text-white transition-colors focus:outline-none shrink-0">
                    {volume === 0
                        ? <IconVolume3 size={18} />
                        : volume < 50
                            ? <IconVolume size={18} />
                            : <IconVolume2 size={18} />}
                </button>
                <Slider 
                    value={volume} 
                    onChange={onVolumeChange} 
                    variant="white"
                    label="Volume"
                />
            </div>
        </div>
    );
}
