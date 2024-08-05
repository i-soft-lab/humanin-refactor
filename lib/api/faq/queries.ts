import { getFaq, TScreen } from '@/lib/api/faq/client';
import { useQuery } from '@tanstack/react-query';

export const FAQ_QUERY_KEY = {
  faq: (screen: TScreen) => ['faq', screen],
};

export const useGetFaqQuery = (screen: TScreen) => {
  return useQuery({
    queryKey: FAQ_QUERY_KEY.faq(screen),
    queryFn: () => getFaq(screen),
  });
};
