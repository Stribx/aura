import { useContext } from 'react';
import { LibraryContext } from './LibraryContext';

export function useLibrary() {
    const context = useContext(LibraryContext);
    if (context === undefined) {
        throw new Error('useLibrary must be used within a MusicProvider');
    }
    return context;
}
