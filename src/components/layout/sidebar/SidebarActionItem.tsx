const ACTIVE_COLOR_CLASSES: Record<string, string> = {
    red: 'bg-gradient-to-r from-red-600/20    to-transparent text-red-400    font-medium',
    green: 'bg-gradient-to-r from-green-600/20  to-transparent text-green-400  font-medium',
    yellow: 'bg-gradient-to-r from-yellow-600/20 to-transparent text-yellow-400 font-medium',
    purple: 'bg-gradient-to-r from-purple-600/20 to-transparent text-purple-400 font-medium',
    cyan: 'bg-gradient-to-r from-cyan-600/20   to-transparent text-cyan-400   font-medium',
    pink: 'bg-gradient-to-r from-pink-600/20   to-transparent text-pink-400   font-medium',
};

interface SidebarActionItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    activeColor?: keyof typeof ACTIVE_COLOR_CLASSES;
    onClick?: () => void;
}

export function SidebarActionItem({ icon, label, active, activeColor = 'purple', onClick }: SidebarActionItemProps) {
    const activeClass = ACTIVE_COLOR_CLASSES[activeColor] ?? ACTIVE_COLOR_CLASSES.purple;
    const inactiveClass = 'text-gray-400 hover:text-white hover:bg-white/5';
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${active ? activeClass : inactiveClass}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}