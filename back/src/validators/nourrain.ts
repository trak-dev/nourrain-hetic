import { z } from "zod";

export const getOneInterfaceSchema = z.object({
  id: z.string(),
});
