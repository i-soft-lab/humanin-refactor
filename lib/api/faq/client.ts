const BASE_URL = `${process.env.EXPO_PUBLIC_FAQ_BASE_URL}`;

//client
export const getFaq = async (screen: TScreen): Promise<TFaqResDto> => {
  const response = await fetch(`${BASE_URL}/${screen}.json`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

//type
export type TScreen = 'S01' | 'S02' | 'R01' | 'R02' | 'R03' | 'R04';

export type TFaqResDto = {
  key: string;
  question: string;
  answer: string;
}[];
