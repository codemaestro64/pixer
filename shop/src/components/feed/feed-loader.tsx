import ContentLoader from 'react-content-loader';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

export default function FeedCardLoader(props: any) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'100%'}
      viewBox="0 0 480 640"
      backgroundColor={isMounted && isDarkMode ? '#505050' : '#d0d0d0'}
      foregroundColor={isMounted && isDarkMode ? '#606060' : '#c0c0c0'}
      {...props}
    >
      <circle cx="30" cy="30" r="30" />
      <rect x="75" y="8" rx="3" ry="3" width="80%" height="12" />
      <rect x="75" y="40" rx="3" ry="3" width="30%" height="10" />
      <rect x="0" y="600" rx="3" ry="3" width="100%" height="50" />
      <rect x="0" y="110" rx="0" ry="0" width="100%" height="400" />
    </ContentLoader>
  );
}
