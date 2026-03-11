import { useEffect } from 'react';
import { IconPlaylist, IconMusic, IconEdit } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/Dialog';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; desc: string }) => void;
    initialData?: { title: string; desc: string };
    mode?: 'create' | 'edit';
}

export function PlaylistModal({ isOpen, onClose, onSubmit, initialData, mode = 'create' }: Props) {
    const form = useForm({
        defaultValues: {
            title: initialData?.title || '',
            desc: initialData?.desc || '',
        },
        onSubmit: async ({ value }) => {
            onSubmit(value);
            onClose();
        },
    });

    // Reset form when initialData changes or modal opens
    useEffect(() => {
        if (isOpen) {
            form.reset({
                title: initialData?.title || '',
                desc: initialData?.desc || '',
            });
        }
    }, [isOpen, initialData, form]);

    const isEdit = mode === 'edit';

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg p-0 border-none">
                <DialogHeader className="p-6 border-b border-white/5 flex flex-row items-center gap-3 pr-12">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                        {isEdit ? <IconEdit size={24} /> : <IconPlaylist size={24} />}
                    </div>
                    <div>
                        <DialogTitle>{isEdit ? 'Edit Playlist' : 'Create New Playlist'}</DialogTitle>
                        <DialogDescription className="sr-only">
                            {isEdit ? 'Update your playlist details.' : 'Fill in the details to create a new playlist.'}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="p-8 space-y-6"
                >
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) => 
                                !value ? 'Title is required' : undefined,
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <label htmlFor={field.name} className="text-sm font-semibold text-gray-400 ml-1">
                                    Playlist Name
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    autoFocus
                                    type="text"
                                    placeholder="My Awesome Mix"
                                    className={`w-full bg-black/40 border rounded-2xl py-4 px-6 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                                        field.state.meta.errors.length > 0 
                                        ? 'border-red-500/50 focus:border-red-500' 
                                        : 'border-white/10 focus:border-purple-500'
                                    }`}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 ml-1 mt-1 font-medium italic">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    <form.Field
                        name="desc"
                        children={(field) => (
                            <div className="space-y-2">
                                <label htmlFor={field.name} className="text-sm font-semibold text-gray-400 ml-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="A collection of my favorite tracks for studying..."
                                    rows={3}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none"
                                />
                            </div>
                        )}
                    />

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-14 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
                        >
                            Cancel
                        </button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="flex-1 h-14 rounded-2xl bg-white text-black font-extrabold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xl shadow-white/5"
                                >
                                    {isSubmitting ? '...' : (isEdit ? 'Save Changes' : 'Create Playlist')}
                                </button>
                            )}
                        />
                    </div>
                </form>

                <div className="p-6 bg-white/5 border-t border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0">
                        <IconMusic className="text-white" size={24} />
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        {isEdit 
                            ? "Update your playlist's title and description to keep your collection organized."
                            : "Start your new collection! You can add tracks to this playlist anytime by browsing the catalog or your library."
                        }
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
