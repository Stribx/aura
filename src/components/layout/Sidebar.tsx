import {
    IconPlanet,
    IconMusic, IconHeart, IconDisc,
    IconHome
} from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { SidebarActionItem } from './sidebar/SidebarActionItem';

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get('tab');

    return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-950/50 backdrop-blur-xl border-r border-white/5 p-6 space-y-8">
            <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">AURA</span>
            </div>
            <nav className="space-y-6">
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">Menu</p>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${pathname === '/' ? 'bg-gradient-to-r from-purple-600/20 to-transparent text-purple-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <IconHome size={22} className={pathname === '/' ? 'text-purple-400' : ''} />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/explore"
                                className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${pathname === '/explore' ? 'bg-gradient-to-r from-cyan-600/20 to-transparent text-cyan-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <IconPlanet size={22} className={pathname === '/explore' ? 'text-cyan-400' : ''} />
                                <span>Explore</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/library"
                                className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${pathname === '/library' && (!currentTab || currentTab === 'overview') ? 'bg-gradient-to-r from-pink-600/20 to-transparent text-pink-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <IconDisc size={22} className={pathname === '/library' && (!currentTab || currentTab === 'overview') ? 'text-pink-400' : ''} />
                                <span>Your Library</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">Playlists</p>
                    <ul className="space-y-2">
                        <li>
                            <SidebarActionItem
                                icon={<IconHeart size={22} />}
                                label="Liked Songs"
                                activeColor="red"
                                active={pathname === '/library' && currentTab === 'liked'}
                                onClick={() => navigate({ to: '/library', search: { tab: 'liked' } })}
                            />
                        </li>
                        <li>
                            <SidebarActionItem
                                icon={<IconMusic size={22} />}
                                label="Your Mixes"
                                activeColor="green"
                                active={pathname === '/library' && currentTab === 'playlists'}
                                onClick={() => navigate({ to: '/library', search: { tab: 'playlists' } })}
                            />
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center space-x-3 hover:bg-white/5 p-2 rounded-xl cursor-pointer transition-colors">
                <img src="https://ui-avatars.com/api/?name=User&background=6b21a8&color=fff" alt="User" className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Alex Carter</p>
                    <p className="text-xs text-gray-400 truncate">Premium</p>
                </div>
            </div>
        </aside>
    );
}
