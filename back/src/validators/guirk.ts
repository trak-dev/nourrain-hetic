import { z } from "zod";

export const createCheckoutInterfaceSchema = z.object({
  id: z.number()
});
