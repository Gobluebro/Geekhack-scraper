import { JSDOM } from "jsdom";
import { readTXT } from "https://deno.land/x/flat@0.0.x/mod"

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename

const text = await readTXT(filename);
const dom = new JSDOM(text);

console.log(dom);
// forget about all this stuff and just query stuff here. strange but I guess this is what I gotta do to test.