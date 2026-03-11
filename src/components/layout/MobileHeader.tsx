import { IconMenu } from '@tabler/icons-react';

interface MobileHeaderProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function MobileHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileHeaderProps) {
    return (
        <div className="md:hidden flex items-center justify-between p-4 sticky top-0 z-20 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-lg font-bold">AURA</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
                <IconMenu size={24} />
            </button>
        </div>
    );
}
