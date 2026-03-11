import { 
    IconArrowsShuffle, IconPlayerTrackPrev, IconPlayerPlay, 
    IconPlayerPause, IconPlayerTrackNext, IconRepeat, IconRepeatOnce 
} from '@tabler/icons-react';
import { Slider } from '@/components/ui/Slider';
import type { RepeatMode } from '@/types';

interface Props {
    isPlaying: boolean;
    shuffle: boolean;
    repeat: RepeatMode;
    progress: number;
    isMetadataLoaded: boolean;
    currentTimeLabel: string;
    durationLabel: string;
    onTogglePlay: () => void;
    onPlayNext: () => void;
    onPlayPrev: () => void;
    onToggleShuffle: () => void;
    onCycleRepeat: () => void;
    onProgressChange: (val: number) => void;
}

export function PlayerControls({
    isPlaying, shuffle, repeat, progress, isMetadataLoaded, 
    currentTimeLabel, durationLabel,
    onTogglePlay, onPlayNext, onPlayPrev, onToggleShuffle, 
    onCycleRepeat, onProgressChange
}: Props) {
    const repeatIcon = repeat === 'one'
        ? <IconRepeatOnce size={18} className="text-white" />
        : <IconRepeat size={18} className={repeat === 'all' ? 'text-white' : ''} />;

    return (
        <div className="flex flex-col items-center justify-center w-2/4 max-w-xl">
            <div className="flex items-center space-x-6 mb-2">
                <button onClick={onToggleShuffle} aria-label="Shuffle"
                    className={`hidden sm:block transition-colors ${shuffle ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-white'}`}>
                    <IconArrowsShuffle size={18} />
                </button>
                <button onClick={onPlayPrev} aria-label="Previous track" className="text-gray-300 hover:text-white transition-colors">
                    <IconPlayerTrackPrev size={24} fill="currentColor" />
                </button>
                <button onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {isPlaying
                        ? <IconPlayerPause size={20} fill="currentColor" />
                        : <IconPlayerPlay size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={onPlayNext} aria-label="Next track" className="text-gray-300 hover:text-white transition-colors">
                    <IconPlayerTrackNext size={24} fill="currentColor" />
                </button>
                <button onClick={onCycleRepeat} aria-label="Repeat"
                    className={`hidden sm:flex transition-colors ${repeat !== 'none' ? 'text-purple-400 hover:text-purple-300' : 'text-gray-400 hover:text-white'}`}>
                    {repeatIcon}
                </button>
            </div>

            <div className="w-full flex items-center space-x-3 text-xs text-gray-400">
                <span className="w-10 text-right">{currentTimeLabel}</span>
                <Slider 
                    value={progress} 
                    onChange={onProgressChange} 
                    disabled={!isMetadataLoaded} 
                    label="Playback progress"
                />
                <span className="w-10">{durationLabel}</span>
            </div>
        </div>
    );
}
