// app/page.jsx

export default function Home() {

  return (
    <div className="container my-16 mx-auto px-8 py-16 max-w-4xl bg-background/95 shadow-lg rounded-lg border-4 border-apeRed">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-black mb-2 uppercase">HTML & Typography Showcase</h1>
        <p className="text-lg text-foreground-700">A visually appealing guide to common HTML elements and their styling for Ape Gang</p>
      </header>

      <section className="space-y-6">
        {/* Headings Section */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Headings</h2>
          <p className="mb-4">Headings establish hierarchy and structure. Sizes decrease from h1 to h6.</p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Welcome to Your Application (h1)</h1>
            <h2 className="text-2xl font-semibold">Typography Showcase (h2)</h2>
            <h3 className="text-xl font-medium">Base Styles Demo (h3)</h3>
            <h4 className="text-lg font-medium">Element Styling (h4)</h4>
            <h5 className="text-base">Smaller Headings (h5)</h5>
            <h6 className="text-sm">Smallest Heading (h6)</h6>
          </div>
        </div>

        {/* Text Elements */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Text Elements</h2>
          <p className="mb-4">Paragraphs and inline text styles for readable content.</p>
          <div className="space-y-4">
            <p>
              This is a regular paragraph (p). It shows default text styling with{" "}
              <strong className="font-bold">bold text</strong> and{" "}
              <em className="italic">italic text</em> inline.
            </p>
            <p>
              Here’s a paragraph with a <a href="#" className="hover:underline">link</a>. Links have hover effects.
            </p>
            <small className="block">This is small text, great for captions or fine print.</small>
          </div>
        </div>

        {/* Blockquote */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Blockquote</h2>
          <p className="mb-4">Used for quotes or highlighted text with distinct styling.</p>
          <blockquote className="border-l-4 pl-4 italic">
            This is a blockquote. It features a left border and italic text, ideal for emphasizing quotes or key points.
          </blockquote>
        </div>

        {/* Code Examples */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Code</h2>
          <p className="mb-4">Inline code and code blocks for technical content.</p>
          <div className="space-y-4">
            <p>
              Inline <code className="p-1 rounded text-sm">code text</code> within a paragraph.
            </p>
            <pre className="p-4 rounded-lg overflow-x-auto">
              {`function example() {
  // This is a code block
  return "Hello World";
}`}
            </pre>
          </div>
        </div>

        {/* Lists */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Lists</h2>
          <p className="mb-4">Ordered and unordered lists for organizing information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Unordered List</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Unordered list item</li>
                <li>Disc-style bullets</li>
                <li>Non-sequential items</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Ordered List</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Ordered list item</li>
                <li>Numbered automatically</li>
                <li>Sequential steps</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Horizontal Rule */}
        <hr className="my-8" />

        {/* Mixed Content Section */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Mixed Content</h2>
          <p className="mb-4">Combining elements to show how they work together.</p>
          <div className="space-y-4">
            <p>
              This section mixes elements like{" "}
              <strong className="font-bold">strong text</strong> and{" "}
              <em className="italic">italic text</em> for emphasis.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                List items with <a href="#" className="hover:underline">links</a>
              </li>
              <li>
                And <code className="p-1 rounded text-sm">code snippets</code>
              </li>
              <li>
                <strong className="font-bold">Even bold text</strong> fits here
              </li>
            </ul>
          </div>
        </div>

        {/* Text Formatting Combinations */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Text Formatting</h2>
          <p className="mb-4">Examples of combined text styles for various use cases.</p>
          <div className="space-y-3">
            <p>
              <strong className="font-bold">
                <em className="italic">Bold and italic</em>
              </strong>{" "}
              - maximum emphasis
            </p>
            <p>
              <code className="p-1 rounded text-sm">
                <strong className="font-bold">Bold code</strong>
              </code>{" "}
              - highlighted code
            </p>
            <p>
              <small>
                <em className="italic">Small italic</em>
              </small>{" "}
              - subtle notes
            </p>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Color Swatches</h2>
          <p className="mb-8">Rounded squares showcasing all custom color families.</p>
          <div className="space-y-12">
            {/* Background Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">Background Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-background-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* Foreground Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">Foreground Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-foreground-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* Message Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">ApeOrange Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeOrange-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* ApeBlue Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">ApeBlue Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeBlue-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* ApeRed Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">ApeRed Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeRed-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* ApreGreen Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">ApeGreen Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-apeGreen-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* Kick Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">Kick Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-kick-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>

            {/* Twitch Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">Twitch Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-50"></div>
                  <small className="mt-1">50</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-100"></div>
                  <small className="mt-1">100</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-200"></div>
                  <small className="mt-1">200</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-300"></div>
                  <small className="mt-1">300</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-400"></div>
                  <small className="mt-1">400</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-500"></div>
                  <small className="mt-1">500</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-600"></div>
                  <small className="mt-1">600</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-700"></div>
                  <small className="mt-1">700</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-800"></div>
                  <small className="mt-1">800</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-900"></div>
                  <small className="mt-1">900</small>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-twitch-950"></div>
                  <small className="mt-1">950</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Colors (Moved to Bottom) */}
        <div className="p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Text Colors</h2>
          <p className="mb-4">Sample text in each custom color family (500 shade).</p>
          <div className="space-y-2">
            <p className="text-background-500">Background 500 Text</p>
            <p className="text-foreground-500">Foreground 500 Text (default p color)</p>
            <p className="text-apeOrange-500">Message 500 Text</p>
            <p className="text-apeBlue-500">ApeBlue 500 Text (default link color)</p>
            <p className="text-apeRed-500">ApeRed 500 Text</p>
            <p className="text-apeGreen-500">ApeGreen 500 Text</p>
            <p className="text-kick-500">Kick 500 Text</p>
            <p className="text-twitch-500">Twitch 500 Text</p>
          </div>
        </div>
      </section>
    </div>
  );
}