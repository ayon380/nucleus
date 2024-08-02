"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, SendIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import rehypeRaw from "rehype-raw";
const hardcodedResponses = {
  hello: "Hello there!\n\nWelcome to our chat. How can I assist you today?",
  "how are you":
    "I'm functioning well, thank you for asking. How may I help you?",
  "what's the weather":
    "I'm sorry, but I don't have access to real-time weather information. You might want to check a weather app or website for the most up-to-date forecast.",
  "tell me a joke":
    "Why don't scientists trust atoms? Because they make up everything!",
  demo: `---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`,
  "list features":
    "Here are some of my features:\n\n- Markdown support\n- Animations\n- Streamlined UI with typing animation",
  "who are you":
    "I'm Nucleus AI, a chatbot designed to assist you with information and answer your questions. How can I help you today?",
  "tell me about a380": `# Airbus A380

## Overview

The **Airbus A380** is a wide-body aircraft manufactured by Airbus. It is the world's largest passenger airliner and the only full-length double-deck jet airliner. Airbus designed the aircraft to challenge Boeing's monopoly in the large-aircraft market and to cater to the growing demand for high-capacity, long-range air travel.

## Development

Development of the A380 began in the 1990s under the project name **A3XX**. Airbus sought to create a new generation of large passenger aircraft that could accommodate more passengers and provide greater efficiency than existing models. The first A380 prototype was unveiled in January 2005, and its maiden flight took place on April 27, 2005.

## Specifications

- **Length**: 72.7 meters (238 feet 7 inches)
- **Wingspan**: 79.75 meters (261 feet 8 inches)
- **Height**: 24.09 meters (79 feet 1 inch)
- **Maximum Takeoff Weight (MTOW)**: 1,234,600 pounds (560,000 kilograms)
- **Range**: 8,000 nautical miles (14,800 kilometers)
- **Seating Capacity**: Up to 853 passengers in an all-economy configuration, but typically around 525 in a three-class configuration

## Features

### Cabin and Comfort

The A380's cabin is known for its spaciousness and comfort. Key features include:

- **Two Full-Length Decks**: The A380 has two full-length passenger decks, offering a total floor area of 5,920 square feet (550 square meters).
- **Quiet and Smooth Ride**: Advanced aerodynamics and powerful yet efficient engines provide a smooth and quiet flight experience.
- **Modern Amenities**: The aircraft can be outfitted with modern amenities such as in-flight entertainment systems, Wi-Fi, and premium seating arrangements.

### Technology

The A380 incorporates several advanced technologies:

- **Fly-By-Wire Controls**: The A380 uses fly-by-wire technology, allowing for more precise and efficient control of the aircraft.
- **Advanced Materials**: The airframe includes a high proportion of composite materials, which reduce weight and improve fuel efficiency.
- **Efficient Engines**: The A380 is powered by either the Rolls-Royce Trent 900 or the Engine Alliance GP7200 engines, both of which provide high thrust and efficiency.

## Economic Impact

The A380 has had a significant economic impact on the aviation industry:

- **Cost Efficiency**: Its large capacity allows airlines to reduce the cost per seat-mile, making it a cost-effective option for high-demand routes.
- **Airport Infrastructure**: The size of the A380 has prompted many airports to upgrade their facilities to accommodate the aircraft, including wider taxiways, larger gates, and double-deck jet bridges.

## Future

Despite its groundbreaking design and popularity among passengers, the A380 faced challenges in terms of sales and production costs. Airbus announced in 2019 that it would cease production of the A380 in 2021 due to a lack of new orders and a shift in market demand towards smaller, more fuel-efficient aircraft. Nevertheless, the A380 remains an iconic symbol of modern aviation and will continue to be a prominent feature in the fleets of major airlines around the world for years to come.

## Conclusion

The Airbus A380 has left a lasting legacy in the aviation industry. Its impressive size, advanced technology, and passenger comfort have set new standards for long-haul travel. While its production may have ended, the A380's impact will be felt for decades, demonstrating Airbus's ability to innovate and push the boundaries of aircraft design.
`,

  default:
    "I'm not sure how to respond to that. Could you please rephrase or ask something else?",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Welcome to Nucleus AI! You can ask me questions like:\n\n- Hello\n- How are you?\n- What's the weather?\n- Tell me a joke\n- List features\n- Demo",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulateTyping = async (text) => {
    setIsTyping(true);
    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = text.slice(0, i);
        return newMessages;
      });
    }
    setIsTyping(false);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      const botResponse =
        hardcodedResponses[input.toLowerCase()] || hardcodedResponses.default;
      setMessages((prev) => [...prev, { type: "bot", content: "" }]);
      simulateTyping(botResponse);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-neutral-800 text-black dark:text-white ">
      <div className="flex sticky top-0 items-center justify-between p-4 dark:bg-neutral-800">
        <h1 className="text-xl font-bold">Nucleus AI</h1>
      </div>

      <div className="flex-grow p-4 rounded-xl space-y-4 bg-white overflow-auto dark:bg-black">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-neutral-500 dark:bg-neutral-800 text-white"
                    : "bg-gray-100 dark:bg-neutral-900"
                }`}
              >
                <ReactMarkdown className={"markdown"} rehypePlugins={[rehypeRaw]}>{message.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded-full">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="px-4 pt-4 pb-4 ">
        <div className="flex items-center bg-white dark:bg-black rounded-full overflow-hidden">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-white px-4 py-2 dark:text-white dark:bg-black text-base bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className="dark:bg-gray-300 mr-1 hover:bg-blue-600 dark:text-black text-black bg-gray-100 p-2 rounded-full flex items-center justify-center"
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
