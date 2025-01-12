import Link from "next/link";
import React from "react";
import Image from "next/image";

const bots = [
  {
    id: 1,
    imageSrc: "/FormChatIcon.svg",
    url: "/text-bots",
    name: "Daily Chat Bot",
    description:
      "Start your day with engaging conversations! 🌞 Whether it's casual talk, thoughtful discussions, or just sharing ideas, the Daily Chat Bot is here to keep you company and spark your mind every day.",
    tags: ["#AICompanion",  "#Interactive"],
  },
];


export default function page() {
  return (
    <div className="w-full px-2 py-3">
      <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden h-full">
        {bots.map((bot) => {
          const { id, imageSrc, url, description, name, tags } = bot;
          return (
            <Link key={id} href={url}>
              <BotExploreComp
                description={description}
                imageSrc={imageSrc}
                name={name}
                tags={tags}
                url={url}
              ></BotExploreComp>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// bots description container
function BotExploreComp({ imageSrc, description, name, tags }) {
  return (
    <>
      {imageSrc && description ? (
        <div className="bg-neutral-900 min-h-24 w-full rounded-lg flex flex-col p-2 py-3 gap-1">
          {/* heading */}
          <div className="flex gap-2 items-center">
            <span>
              <Image src={imageSrc} height={24} width={24} alt={name}></Image>
            </span>
            <h1 className="text-lg">{name}</h1>
          </div>

          <div className="line-clamp-3">
            <p className="text-sm">{description}</p>
          </div>

          <div className="flex w-full gap-2">
            {tags.map((item, id) => (
              <div className="bg-neutral-800 rounded-full px-2 py-1" key={id}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
