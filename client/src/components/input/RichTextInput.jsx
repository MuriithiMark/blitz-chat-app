import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import sanitize from "sanitize-html";


/**
 *
 * @param {{className: string, content: string, onChange: (content: string) => void}} param0
 * @returns
 */
function RichTextInput({ className, onChange, value }) {
  /**
   * @type {React.Ref<HTMLDivElement>}
   */
  const richTextInputRef = useRef();

  const [content, setContent] = useState("");


  useEffect(() => {
    richTextInputRef.current.innerHTML = '<b>Hello World</b>'
  } ,[content])

  const sanitizeConf = {
    allowedTags: ["b", "i", "a", "p", "span", "video", "img", "audio"],
    allowedAttributes: { a: ["href"] },
  };

  /**
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} event
   */
  const handleKeyUp = (event) => {
    const escapedHTML = event.target.innerHTML;
    const rawHTML = new DOMParser().parseFromString(escapedHTML, "text/html")
      .documentElement.textContent;
    const sanitizedHTML = sanitize(rawHTML, sanitizeConf);
    richTextInputRef.current.innerHTML = sanitizedHTML
    richTextInputRef.current.collapse()
    onChange(sanitizedHTML);
  };

  return (
    <div
      className={className}
      contentEditable
      ref={richTextInputRef}
      suppressContentEditableWarning={true}
      onInput={handleKeyUp}
    />
  );
}

export default RichTextInput;
