import { z } from "zod";



export const googleAuthSchema = z.object({
  idToken: z.string(),
});


