import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json({ completion: completion.choices[0].message });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch completion" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//     try {
//       const { messages } = await req.json();
  
//       // Create a streaming response from OpenAI
//       const stream = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages,
//         stream: true, // Enable streaming mode
//       });
  
//       const encoder = new TextEncoder();
  
//       // Create a ReadableStream to send data in chunks
//       const readableStream = new ReadableStream({
//         async start(controller) {
//           for await (const chunk of stream) {
//             const text = chunk.choices[0]?.delta?.content || "";
//             controller.enqueue(encoder.encode(text));
//           }
//           controller.close();
//         },
//       });
  
//       return new Response(readableStream, {
//         headers: { "Content-Type": "text/plain" },
//       });
  
//     } catch (error) {
//       console.error("OpenAI API error:", error);
//       return NextResponse.json(
//         { error: "Failed to fetch completion" },
//         { status: 500 }
//       );
//     }
//   }