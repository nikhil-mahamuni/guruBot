import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const contentTypes = [
  { id: 1, value: "twitter", label: "Twitter Threads" },
  { id: 2, value: "instagram", label: "Instagram Captions" },
  { id: 3, value: "likedin", label: "LinkedIn Post" },
];

function ContentGeneratorCard({
  contentData,
  setContentData,
  handleFormSubmition,
}) {
  function changeInputField(e) {
    const { name, value } = e.target;
    setContentData((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputContentChange(value) {
    setContentData((prev) => ({ ...prev, contentType: value }));
  }

  return (
    <div>
      <Card className="border-none rounded-xl px-2 py-3 bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-xl tracking-wide text-white ">
            Social Media Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col mt-4">
            <div className="flex flex-col gap-3 mb-6">
              {/* Content Type */}
              <div className="flex flex-col gap-2">
                <label className="text-white">Content Type</label>
                <Select
                  onValueChange={handleInputContentChange}
                  className="w-full "
                >
                  <SelectTrigger className="bg-black text-white tracking-wide">
                    <SelectValue className="" placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-black">
                    {contentTypes.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.value}
                        className="bg-black tracking-wide text-white"
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt */}
              <div className="flex flex-col gap-2">
                <label className="text-white">Prompt</label>
                <Textarea
                  name="prompt"
                  onChange={changeInputField}
                  value={contentData.prompt}
                  className="bg-black tracking-wide text-white h-28 overflow-x-hidden overflow-y-auto"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <Button onClick={handleFormSubmition} className="w-[70%] text-lg">
                <h1>Generate Content</h1>
                <Image
                  src="/starIcon.svg"
                  height={25}
                  width={25}
                  alt="Star Icon"
                ></Image>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContentGeneratorCard;
