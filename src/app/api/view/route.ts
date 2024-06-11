export const dynamic = 'force-dynamic';

import { getFile } from "@/components/s3oosh/_actions/getFile";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get("fileName");
    const download = url.searchParams.get("download") || false;

    if (!fileName) {
      return new Response("File name is required", { status: 400 });
    }

    const range = req.headers.get("Range");
    const { status, headers, stream, error } = await getFile(fileName, download, range);

    if (error) {
      return new Response(error, { status, headers });
    }

    return new Response(stream, { status, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
