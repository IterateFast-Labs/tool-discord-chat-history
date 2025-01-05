import fs from "fs";
import type { ChatItem } from "./type";

async function getChatList({
  beforeId,
  limit = 50,
}: {
  beforeId: string | null;
  limit?: number;
}) {
  const response = await fetch(
    `https://discord.com/api/v9/channels/${
      process.env.CHANEL_ID
    }/messages?limit=${limit}${beforeId ? `&before=${beforeId}` : ""}`,
    {
      headers: {
        authorization: process.env.DISCORD_AUTH_TOKEN as string,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const json = (await response.json()) as ChatItem[];

  return json;
}

async function saveChatList(list: ChatItem[]) {
  //   if (!fs.existsSync("../output/chat-list.csv")) {
  //     fs.writeFileSync(
  //       "./output/chat-list.csv",
  //       "id,global_name,username,content,mention_to,timestamp\n"
  //     );
  //   }

  for (const item of list) {
    const { id, author, content, message_reference, timestamp } = item;

    if (author.global_name === null) {
      // 봇이므로 무시
      continue;
    }

    if (content.trim() === "") {
      // 내용이 없는 경우 무시
      continue;
    }

    const replyTo = message_reference?.message_id ?? "";

    // CSV에 저장하기 위해 , 를 ，로 바꾸고, 줄바꿈을 \n문자열로 나타나게 한다.
    const sanitizedContent = content.replace(/,/g, "，").replace(/\n/g, "\\n");

    const line = `${id},${author.global_name},${author.username},${sanitizedContent},${replyTo},${timestamp}\n`;

    // 밑으로 추가
    fs.appendFileSync("./output/chat-list.csv", line);
  }
}

async function main() {
  let beforeId: string | null = null;
  const limit = 50;
  const iteration = 10000; // 500,000

  for (let i = 0; i < iteration; i++) {
    console.log(`Iteration: ${i} Start`);
    const list = await getChatList({
      beforeId,
      limit,
    });

    if (list.length === 0) {
      break;
    }

    await saveChatList(list);
    console.log(`Saved ${list.length} items`);
    beforeId = list[list.length - 1].id;

    console.log(`Iteration: ${i} End`);
  }
}

main().catch(console.error);
