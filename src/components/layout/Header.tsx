import { IconPlayerTrackPrev, IconPlayerTrackNext, IconSearch } from '@tabler/icons-react';
import { useRouter, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export function Header() {
    const router = useRouter();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate({ to: '/explore', search: { q: searchQuery } });
            setSearchQuery('');
        }
    };

    return (
        <header className="hidden md:flex justify-between items-center">
            <div className="flex space-x-4">
                <button
                    onClick={() => router.history.back()}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors hover:text-white group">
                    <IconPlayerTrackPrev size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
                <button
                    onClick={() => router.history.forward()}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors hover:text-white group">
                    <IconPlayerTrackNext size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative group">
                    <IconSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your aura..."
                        className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-500"
                    />
                </form>
            </div>
        </header>
    );
}

