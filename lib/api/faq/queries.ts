import { getFaq, TScreen } from '@/lib/api/faq/client';
import { useQuery } from '@tanstack/react-query';

export const useGetFaqQuery = (screen: TScreen) => {
  return useQuery({
    queryKey: ['faq', screen],
    queryFn: () => getFaq(screen),
  });
};
