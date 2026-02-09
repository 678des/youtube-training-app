"use server";
import { createClient } from "@/lib/supabase/server";

export async function newVideo(title: string) {
  const supabase = await createClient();
  try {
    await supabase.from("videos").insert({
      title: "My New Video",
    });
  } catch (err) {
    console.log(err);
  }
}
