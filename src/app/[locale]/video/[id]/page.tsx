import { notFound } from "next/navigation";
import VideoPlayer from "./VideoPlayer";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <VideoPlayer id={id} />;
}
