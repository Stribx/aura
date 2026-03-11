import { lazy, Suspense } from 'react';
import { useMusic } from '../context/useMusic';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { usePlayerUI } from '../hooks/usePlayerUI';
import { PlayerSongInfo } from './PlayerSongInfo';
import { PlayerControls } from './PlayerControls';
import { PlayerActions } from './PlayerActions';

const QueuePanel = lazy(() => import('./QueuePanel').then(m => ({ default: m.QueuePanel })));
const PlayerMaximized = lazy(() => import('./PlayerMaximized').then(m => ({ default: m.PlayerMaximized })));

export function PlayerBar() {
    const {
        currentSong, isPlaying, togglePlay, playNext, playPrev,
        toggleLyrics, isLyricsOpen, shuffle, repeat, toggleShuffle,
        cycleRepeat, queue, playSong, songKey,
    } = useMusic();

    const ui = usePlayerUI();

    const {
        audioRef,
        progress,
        isMetadataLoaded,
        currentTimeLabel,
        durationLabel,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleProgressChange,
    } = useAudioEngine({
        src: currentSong?.preview,
        songKey,
        isPlaying,
        volume: ui.volume,
    });

    if (!currentSong) return null;

    return (
        <>
            <Suspense fallback={null}>
                {ui.isMaximized && (
                    <PlayerMaximized 
                        song={currentSong} 
                        isPlaying={isPlaying} 
                        onClose={ui.closeMaximized} 
                    />
                )}
            </Suspense>

            <div className="fixed bottom-0 left-0 right-0 h-24 bg-gray-950/80 backdrop-blur-2xl border-t border-white/10 z-50 flex items-center justify-between px-4 md:px-8">
                <audio
                    ref={audioRef}
                    src={currentSong.preview}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={playNext}
                />

                <PlayerSongInfo 
                    song={currentSong} 
                    isPlaying={isPlaying} 
                    onOpenMaximized={ui.openMaximized} 
                />

                <PlayerControls
                    isPlaying={isPlaying}
                    shuffle={shuffle}
                    repeat={repeat}
                    progress={progress}
                    isMetadataLoaded={isMetadataLoaded}
                    currentTimeLabel={currentTimeLabel}
                    durationLabel={durationLabel}
                    onTogglePlay={togglePlay}
                    onPlayNext={playNext}
                    onPlayPrev={playPrev}
                    onToggleShuffle={toggleShuffle}
                    onCycleRepeat={cycleRepeat}
                    onProgressChange={handleProgressChange}
                />

                <PlayerActions
                    isLyricsOpen={isLyricsOpen}
                    isQueueOpen={ui.isQueueOpen}
                    volume={ui.volume}
                    onToggleLyrics={toggleLyrics}
                    onToggleQueue={ui.toggleQueue}
                    onToggleMute={ui.toggleMute}
                    onVolumeChange={ui.setVolume}
                />
            </div>

            <Suspense fallback={null}>
                {ui.isQueueOpen && (
                    <QueuePanel
                        queue={queue}
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        onClose={ui.closeQueue}
                        onPlaySong={(song, q) => playSong(song, q)}
                    />
                )}
            </Suspense>
        </>
    );
}
