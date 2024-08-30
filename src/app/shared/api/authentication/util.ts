import { ZodError, z } from 'zod';
import axiosInstance from '../axios';

const performMutation = async (
  url: string,
  schema: z.ZodType<any>,
  vars: any,
) => {
  try {
    schema.parse(vars);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(
        `Validation Error: ${error.errors.map((e) => e.message).join(', ')}`,
      );
    }
  }

  try {
    const response = await axiosInstance.post(url, vars);

    return response.data;
  } catch (error: any) {
    const eResponse = error.response;

    if (eResponse) {
      const eData = eResponse.data;
      if (eData) {
        const errorMessage = eData.message || eData.error || eData.status || eData.email || 'Request failed';

        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(new Error('Request failed'));
  }
};

export default performMutation;
