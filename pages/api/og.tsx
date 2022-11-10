import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const config = {
  runtime: "experimental-edge",
}

const Handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const hasSlug = searchParams.has("slug")
  const slug = hasSlug ? searchParams.get("slug") : ""

  const [res] = await Promise.all([
    fetch(`https://api.jiaxin.im/api/posts/${slug}/`),
  ])

  const [data] = await Promise.all([res.json()])

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(to right, #536976, #292e49)",
        }}>
        <div tw="flex">
          <div tw="flex flex-col w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-5xl text-slate-50 text-center">
              {data.title}
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}

export default Handler
