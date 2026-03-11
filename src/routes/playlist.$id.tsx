import { createFileRoute } from '@tanstack/react-router';
import { PlaylistWrapper } from '@/features/library/PlaylistWrapper';

export const Route = createFileRoute('/playlist/$id')({
  component: PlaylistWrapper,
});
