import * as z from "zod";
import fs from "fs/promises";
import db from "@/db/db";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const editSchema = z.object({
  name: z.string().min(1, "Name Is Required"),
  image: imageSchema.refine((image) => image.size > 0, "Required"),
});

export async function UpdateUserProfile(id: string, formdata: FormData) {
  const user = editSchema.safeParse(Object.fromEntries(formdata.entries()));
  if (user.success == false) {
    return user.error.formErrors.fieldErrors;
  }

  const data = user.data;
  const profile = await db.user.findUnique({
    where: { id },
  });
  if (profile == null) return notFound();
  await fs.mkdir("public/profile", { recursive: true });
  const imagePath = `/user/profile/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.user.update({
    where: { id },
    data: {
      name: data.name,
      image: imagePath,
    },
  });
  revalidatePath("/");
  revalidatePath("/user/profile");
}
