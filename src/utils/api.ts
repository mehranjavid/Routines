import axios, {AxiosResponse} from 'axios';

interface ApiResponse {
  docs: [];
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

const SERVER = process.env.SERVER;

export const fetchData = async (
  page: number,
  limit: number = 10,
): Promise<ApiResponse> => {
  console.log(`${SERVER}/v1/api/reminders/all`);
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${SERVER}/v1/api/reminders/all`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
        params: {
          page: page,
          limit: limit,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('fetchData Error:', error.message);
    throw error;
  }
};
